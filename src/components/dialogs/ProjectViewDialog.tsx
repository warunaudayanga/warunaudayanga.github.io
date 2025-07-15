import { JSX } from "react";
import { ProjectDocument, PropsWithCloseAndData, UploadedFile } from "../../interfaces";
import ToolSection from "./ToolSection.tsx";
import StackItems from "./StackItems.tsx";
import { DialogBodySection, DialogButtonSection } from "../layout";
import { Button } from "../other";
import { stackIcon } from "../../data/stack-icons.ts";
import { innerHTML } from "../../utils";
import npmCover from "../../assets/svg/npm.svg";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { FaCode, FaCog, FaDatabase, FaExternalLinkAlt, FaGithub, FaInfoCircle, FaNpm } from "react-icons/fa";

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
                <StackItems tools={tools}></StackItems>
            </ToolSection>
        ) : null;

    return (
        <>
            <DialogBodySection full={true} noHeader>
                <div className="view-container h-full px-3">
                    {data?.name && <div className="text-center font-bold line-hei text-4xl my-5">{data.name}</div>}
                    <div className="flex gap-5 justify-center mb-5">
                        {data?.techStack && (
                            <StackItems
                                tools={data.techStack}
                                size="30px"
                                className="m-3"
                                labelClassName="text-xl font-bold"
                            ></StackItems>
                        )}
                    </div>
                    {data?.cover && (
                        <div className="h-[65%] w-full bg-no-repeat bg-center bg-contain mb-10 flex justify-center">
                            <img src={data.cover.url} alt="cover" className="border-2 rounded-lg h-full" />
                        </div>
                    )}
                    {!data?.cover && data?.category === ProjectCategory.NPM && (
                        <div className="h-[25%] w-full bg-no-repeat bg-center bg-contain mb-10 flex justify-center">
                            <img src={npmCover} alt="cover" className="h-full" />
                        </div>
                    )}
                    <div className="max-w-screen-lg m-auto">
                        {/* Project Information Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {data?.projectType && (
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaInfoCircle className="text-blue-600" />
                                        <span className="font-semibold text-blue-800">Type</span>
                                    </div>
                                    <span className="text-blue-700 font-medium">{data.projectType}</span>
                                </div>
                            )}
                            {data?.company && (
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCog className="text-green-600" />
                                        <span className="font-semibold text-green-800">Company</span>
                                    </div>
                                    <span className="text-green-700 font-medium">{data.company}</span>
                                </div>
                            )}
                            {data?.client && (
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaInfoCircle className="text-purple-600" />
                                        <span className="font-semibold text-purple-800">
                                            {data.clientType || "Client"}
                                        </span>
                                    </div>
                                    <span className="text-purple-700 font-medium">{data.client}</span>
                                </div>
                            )}
                            {data?.position && (
                                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaInfoCircle className="text-orange-600" />
                                        <span className="font-semibold text-orange-800">Position</span>
                                    </div>
                                    <span className="text-orange-700 font-medium">{data.position}</span>
                                </div>
                            )}
                            {data?.role && (
                                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaInfoCircle className="text-indigo-600" />
                                        <span className="font-semibold text-indigo-800">Role</span>
                                    </div>
                                    <span className="text-indigo-700 font-medium">{data.role}</span>
                                </div>
                            )}
                        </div>

                        {/* Remarks Section */}
                        {data?.remarks && (
                            <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaInfoCircle className="text-yellow-600" />
                                    <span className="font-semibold text-yellow-800">Important Note</span>
                                </div>
                                <p className="text-yellow-800 font-medium">{data.remarks}</p>
                            </div>
                        )}

                        {/* Description Section */}
                        {data?.description && (
                            <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaInfoCircle className="text-blue-600" />
                                    Project Description
                                </h3>
                                <div
                                    className="text-justify text-gray-700 text-base leading-relaxed prose prose-blue max-w-none"
                                    dangerouslySetInnerHTML={innerHTML(data.description)}
                                ></div>
                            </div>
                        )}

                        {/* Technologies & Tools Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                            {/* Core Technologies */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaCode className="text-blue-600" />
                                    Core Technologies
                                </h3>
                                <div className="space-y-6">
                                    {data?.languages && addTools("Languages", data.languages)}
                                    {data?.databases && addTools("Database", data.databases)}
                                    {data?.deployment && addTools("Deployment", data.deployment)}
                                    {data?.services && addTools("Services", data.services)}
                                    {data?.otherLibs && addTools("Other Tools", data.otherLibs)}
                                </div>
                            </div>

                            {/* Libraries & Frameworks */}
                            {libraries && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <FaDatabase className="text-green-600" />
                                        Libraries & Frameworks
                                    </h3>
                                    <div className="space-y-6">
                                        {data.coreLibs && addTools("Core Libraries / Frameworks", data.coreLibs)}
                                        {data.uiLibs && addTools("UI Libraries / Frameworks", data.uiLibs)}
                                        {data.stateManageLibs &&
                                            addTools("State Management Libraries", data.stateManageLibs)}
                                        {data.backendLibs &&
                                            addTools("Backend Libraries / Frameworks", data.backendLibs)}
                                        {data.databaseLibs && addTools("Database Libraries", data.databaseLibs)}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Sources Section */}
                        {(data?.frontendGit || data?.backendGit || data?.githubUrl || data?.npmUrl) && (
                            <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaCode className="text-gray-600 me-2" />
                                    Source Code & Repositories
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.frontendGit && (
                                        <Button
                                            type="link"
                                            variant="link-button"
                                            color="github"
                                            link={data.frontendGit}
                                            icon={<FaGithub className="w-4 h-4 me-2" />}
                                            className="w-full justify-center"
                                        >
                                            Frontend Repository
                                        </Button>
                                    )}
                                    {data.backendGit && (
                                        <Button
                                            type="link"
                                            variant="link-button"
                                            color="github"
                                            link={data.backendGit}
                                            icon={<FaGithub className="w-4 h-4 me-2" />}
                                            className="w-full justify-center"
                                        >
                                            Backend Repository
                                        </Button>
                                    )}
                                    {data.githubUrl && (
                                        <Button
                                            type="link"
                                            variant="link-button"
                                            color="github"
                                            link={data.githubUrl}
                                            icon={<FaGithub className="w-4 h-4 me-2" />}
                                            className="w-full justify-center"
                                        >
                                            {data.githubName || "Repository"}
                                        </Button>
                                    )}
                                    {data.npmUrl && (
                                        <Button
                                            type="link"
                                            variant="link-button"
                                            color="npm"
                                            link={data.npmUrl}
                                            icon={<FaNpm className="w-4 h-4 me-2" />}
                                            className="w-full justify-center"
                                        >
                                            {data.npmName || "NPM Package"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Project URL Section */}
                        {data?.projectUrl && (
                            <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaExternalLinkAlt className="text-green-600" />
                                    Live Project
                                </h3>
                                <div className="flex justify-center">
                                    <Button
                                        type="link"
                                        variant="action"
                                        color="success"
                                        link={data.projectUrl}
                                        icon={<FaExternalLinkAlt className="w-4 h-4" />}
                                        className="px-8 py-3"
                                    >
                                        Visit Live Project
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Extra Information Section */}
                        {data?.extra && (
                            <div className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaInfoCircle className="text-purple-600" />
                                    Additional Information
                                </h3>
                                <div
                                    className="text-gray-700 prose prose-purple max-w-none"
                                    dangerouslySetInnerHTML={innerHTML(data.extra)}
                                />
                            </div>
                        )}
                        {/* Screenshots Section */}
                        {data?.screenshots?.length && (
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
                                    <FaInfoCircle className="text-blue-600" />
                                    Project Screenshots
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.screenshots.map((screenshot, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                                                <img
                                                    src={(screenshot as UploadedFile).url}
                                                    alt={`Screenshot ${index + 1}`}
                                                    className="w-full h-full object-contain transition-all duration-300 cursor-pointer"
                                                    onClick={() =>
                                                        window.open((screenshot as UploadedFile).url, "_blank")
                                                    }
                                                />
                                            </div>
                                            <p className="text-sm text-gray-600 text-center mt-2">
                                                Screenshot {index + 1} - Click to view full size
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogBodySection>
            <DialogButtonSection>
                <div className="flex justify-center">
                    <Button variant="outline" size="large" onClick={() => close()} className="px-8 py-3 min-w-32">
                        Close
                    </Button>
                </div>
            </DialogButtonSection>
        </>
    );
};

export default ProjectViewDialog;
