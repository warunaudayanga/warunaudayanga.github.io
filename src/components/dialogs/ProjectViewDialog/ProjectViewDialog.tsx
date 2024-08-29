import { JSX } from "react";
import { ProjectDocument, PropsWithCloseAndData, Tool } from "../../../interfaces";
import ToolSection from "./ToolSection.tsx";
import Tools from "./Tools.tsx";
import { DialogBodySection, DialogButtonSection } from "../../layout";
import { Button } from "../../other";

const ProjectViewDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDocument>): JSX.Element => {
    const libraries =
        data?.coreLibs ||
        data?.uiLibs ||
        data?.stateManageLibs ||
        data?.backendLibs ||
        data?.databaseLibs ||
        data?.otherLibs;

    const addTools = (category: string, tools?: Tool[], isSub?: boolean): JSX.Element | null =>
        tools?.length ? (
            <ToolSection category={category} isSub={isSub}>
                <Tools tools={tools}></Tools>
            </ToolSection>
        ) : null;

    return (
        <>
            <DialogBodySection full={true}>
                <div className="h-full px-3">
                    {data?.cover && (
                        <div
                            className="h-full w-full bg-no-repeat bg-center bg-contain mb-5"
                            style={{ backgroundImage: `url(${data.cover.url})` }}
                        />
                    )}
                    <div className="text-2xl font-bold mb-3">{data?.name}</div>
                    {data?.info && (
                        <div className="info mb-3">
                            <p className="text-justify">{data.info}</p>
                        </div>
                    )}
                    <div className="tools">
                        {addTools("Languages", data?.languages)}
                        {addTools("Database", data?.databases)}
                        {addTools("Deployment", data?.deployment)}
                        {addTools("Deployment", data?.services)}
                        {libraries && (
                            <ToolSection category="Frameworks and Libraries">
                                <div className="mb-2">
                                    {addTools("Core Libraries / Frameworks", data.coreLibs, true)}
                                    {addTools("UI Libraries / Frameworks", data.uiLibs, true)}
                                    {addTools("State Management Libraries", data.stateManageLibs, true)}
                                    {addTools("Backend Libraries / Frameworks", data.backendLibs, true)}
                                    {addTools("Database Libraries", data.databaseLibs, true)}
                                    {addTools("Other Tools", data.otherLibs, true)}
                                </div>
                            </ToolSection>
                        )}
                    </div>
                    {data?.extra && (
                        <div className="tool-section mb-3" dangerouslySetInnerHTML={{ __html: data.extra }} />
                    )}
                    {data?.screenshots?.length && (
                        <div className="screenshots h-full">
                            <div className="text-lg font-bold mb-4">Screenshots</div>
                            {data.screenshots.map((screenshot, index) => (
                                <div
                                    key={index}
                                    className="h-full w-full bg-no-repeat bg-center bg-contain mb-5"
                                    style={{ backgroundImage: `url(${screenshot.url})` }}
                                />
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
