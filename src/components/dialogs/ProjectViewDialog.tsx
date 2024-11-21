import { JSX } from "react";
import { ProjectDocument, PropsWithCloseAndData, UploadedFile } from "../../interfaces";
import ToolSection from "./ToolSection.tsx";
import Tools from "./Tools.tsx";
import { DialogBodySection, DialogButtonSection } from "../layout";
import { Button } from "../other";
import { stackIcon } from "../../data/stack-icons.ts";
import { innerHTML } from "../../utils";
import githubLogo from "../../assets/images/logos/github.png";
import npmLogo from "../../assets/images/logos/npm.png";

const ProjectViewDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDocument>): JSX.Element => {
    const libraries =
        data?.coreLibs ||
        data?.uiLibs ||
        data?.stateManageLibs ||
        data?.backendLibs ||
        data?.databaseLibs ||
        data?.otherLibs;

    const addTools = (category: string, tools?: (keyof typeof stackIcon)[], isSub?: boolean): JSX.Element | null =>
        tools?.length ? (
            <ToolSection category={category} isSub={isSub}>
                <Tools tools={tools}></Tools>
            </ToolSection>
        ) : null;

    return (
        <>
            <DialogBodySection full={true}>
                <div className="view-container h-full px-3">
                    {data?.cover && (
                        <div className="h-full w-full bg-no-repeat bg-center bg-contain mb-5 flex justify-center">
                            <img src={data.cover.url} alt="cover" className="border-2 rounded-lg h-full" />
                        </div>
                    )}
                    <div className="text-2xl font-bold mb-3">{data?.name}</div>
                    {data?.description && (
                        <div className="info mb-3">
                            <div className="text-justify" dangerouslySetInnerHTML={innerHTML(data.description)}></div>
                        </div>
                    )}
                    <div className="tools">
                        {data?.languages && addTools("Languages", data.languages)}
                        {data?.databases && addTools("Database", data.databases)}
                        {data?.deployment && addTools("Deployment", data.deployment)}
                        {data?.services && addTools("Deployment", data.services)}
                        {libraries && (
                            <ToolSection category="Frameworks and Libraries">
                                <div className="mb-2">
                                    {data.coreLibs && addTools("Core Libraries / Frameworks", data.coreLibs, true)}
                                    {data.uiLibs && addTools("UI Libraries / Frameworks", data.uiLibs, true)}
                                    {data.stateManageLibs &&
                                        addTools("State Management Libraries", data.stateManageLibs, true)}
                                    {data.backendLibs &&
                                        addTools("Backend Libraries / Frameworks", data.backendLibs, true)}
                                    {data.databaseLibs && addTools("Database Libraries", data.databaseLibs, true)}
                                    {data.otherLibs && addTools("Other Tools", data.otherLibs, true)}
                                </div>
                            </ToolSection>
                        )}
                    </div>
                    {(data?.frontendGit || data?.backendGit || data?.githubUrl || data?.npmUrl) && (
                        <div className="sources mb-3">
                            <div className="text-lg font-bold mb-2">Sources</div>
                            <div className="ml-6">
                                {data.frontendGit && (
                                    <div>
                                        <div className="font-bold mb-1">Frontend</div>
                                        <div className="ml-6">
                                            <div className="flex gap-2 items-center mb-3">
                                                <img alt="logo" className="w-[20px]" src={githubLogo} />
                                                <a
                                                    className="underline"
                                                    href={data.frontendGit}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {data.frontendGit.split("/").pop()}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.backendGit && (
                                    <div>
                                        <div className="font-bold mb-1">Backend</div>
                                        <div className="ml-6">
                                            <div className="flex gap-2 items-center mb-3">
                                                <img alt="logo" className="w-[20px]" src={githubLogo} />
                                                <a
                                                    className="underline"
                                                    href={data.backendGit}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {data.backendGit.split("/").pop()}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.githubUrl && (
                                    <div>
                                        <div className="font-bold mb-1">Github</div>
                                        <div className="ml-6">
                                            <div className="flex gap-2 items-center mb-3">
                                                <img alt="logo" className="w-[20px]" src={githubLogo} />
                                                <a
                                                    className="underline"
                                                    href={data.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {data.githubUrl.split("/").pop()}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.npmUrl && (
                                    <div>
                                        <div className="font-bold mb-1">NPM</div>
                                        <div className="ml-6">
                                            <div className="flex gap-2 items-center mb-3">
                                                <img alt="logo" className="w-[20px]" src={npmLogo} />
                                                <a
                                                    className="underline"
                                                    href={data.npmUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {data.npmUrl.split("/").pop()}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {data?.projectUrl && (
                        <div className="project mb-3">
                            <div className="text-lg font-bold mb-2">Project URL</div>
                            <div className="ml-6">
                                <a className="underline" href={data.projectUrl} target="_blank" rel="noreferrer">
                                    {data.projectUrl}
                                </a>
                            </div>
                        </div>
                    )}
                    {data?.extra && (
                        <div className="extra mb-3">
                            <div className="text-lg font-bold mb-2">Extra</div>
                            <div className="ml-6">
                                <div className="mb-3" dangerouslySetInnerHTML={innerHTML(data.extra)} />
                            </div>
                        </div>
                    )}
                    {data?.screenshots?.length && (
                        <div className="screenshots h-full">
                            <div className="text-lg font-bold mb-4">Screenshots</div>
                            {data.screenshots.map((screenshot, index) => (
                                <div
                                    key={index}
                                    className="h-full w-full bg-no-repeat bg-center bg-contain mb-10 flex justify-center"
                                >
                                    <img
                                        src={(screenshot as UploadedFile).url}
                                        alt="screenshot"
                                        className="border-2 rounded-lg h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogBodySection>
            <DialogButtonSection>
                <Button className="btn-small" color="gray" onClick={() => close()}>
                    Close
                </Button>
            </DialogButtonSection>
        </>
    );
};

export default ProjectViewDialog;
