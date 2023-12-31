"use client" ;

import {JSX, ReactNode, useEffect} from "react" ;

import Box from "@mui/material/Box" ;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore" ;
import ChevronRightIcon from "@mui/icons-material/ChevronRight" ;
import {TreeItem, TreeView} from "@/third-parties/@mui/x-tree-view" ;

import {DependencyTree, PackageNameAndVersion} from "@/types/package" ;
import style from "./page.module.css" ;
import {useSafeState} from "ahooks" ;

function renderTree(nodes: DependencyTree): ReactNode {
    return (
        <TreeItem key={nodes.packageId} nodeId={nodes.packageId} label={nodes.packageName}>
            {
                Array.isArray(nodes.dependencies)
                ? nodes.dependencies.map((node) => renderTree(node))
                : null
            }
        </TreeItem>
    ) ;
};

function RichObjectTreeView({data}: { data: DependencyTree }): JSX.Element {
    return (
        <Box sx={{minHeight: 110, flexGrow: 1, maxWidth: 300}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpanded={["root"]}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
    ) ;
}

interface TreeProps {
    params: PackageNameAndVersion;
}

export default function Tree(props: TreeProps): JSX.Element {
    const {
              params: {
                  packageName,
                  version,
              },
          } = props ;
    console.log(props) ;

    const [data, setData] = useSafeState<DependencyTree | null>(null) ;
    useEffect(() => {
        const func = async (packageName: string, version: string) => {
            setData(
                await fetch(`${process.env.NEXT_PUBLIC_URL}/api/package/${packageName}/${version}/dependency`)
                    .then((res) => res.json()),
            ) ;
        } ;
        func(packageName, version) ;
    }, []) ;

    return (
        <div className={style.detail}>
            <div>
                <span className={style.pkgName}>{decodeURIComponent(packageName)}</span>
                <span className={style.pkgVer}>{decodeURIComponent(version)}</span>
            </div>
            <div className={style.tree}>
                {
                    data ? (<RichObjectTreeView data={data}/>) : (<></>)
                }
            </div>
        </div>
    ) ;
}
