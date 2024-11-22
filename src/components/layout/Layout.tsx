import { JSX, UIEvent, useEffect, useState } from "react";
import { AboutMe, Button, Content, Header, Home, LoginDialog, Menu, Page, PopupMenu, ProjectDialog } from "../index.ts";
import { useAppState, useAuth, useDialog } from "../../hooks";
import { FaHome, FaInfoCircle, FaPowerOff, FaSignInAlt } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { VscGithubProject } from "react-icons/vsc";
import { BiSolidAddToQueue } from "react-icons/bi";
import { DialogRef, MenuItem, ProjectDocument } from "../../interfaces";
import { AppActionType, ProjectActionType } from "../../reducers";
import { Route } from "../../enums";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import { NpmProjects, Projects } from "../sections";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { useProjectState } from "../../hooks/use-project-state.ts";
import { groupBy } from "hichchi-utils";
import { useLocation } from "react-router-dom";
import { ProjectViewDialog } from "../dialogs";

function Layout(): JSX.Element {
    const location = useLocation();

    const [scrolled, setScrolled] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            label: "Home",
            icon: <FaHome />,
            url: "#",
            elementId: Route.HOME,
            hidden: false,
        },
        {
            label: "About Me",
            icon: <FaInfoCircle />,
            url: "#",
            elementId: Route.ABOUT,
            hidden: false,
        },
        {
            label: "Work",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.WORK_PROJECTS,
            hidden: false,
        },
        {
            label: "Personal",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.PERSONAL_PROJECTS,
            hidden: false,
        },
        {
            label: "Collaboration",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.COLLABORATION_PROJECTS,
            hidden: false,
        },
        {
            label: "NPM Libraries",
            icon: <GrProjects />,
            url: "#",
            elementId: Route.NPM_PROJECTS,
            hidden: false,
        },
    ]);
    const [initialized, setInitialized] = useState<boolean>(false);

    const { user, logout } = useAuth();
    const { openDialog } = useDialog();
    const { dispatch } = useAppState();
    const { getProjects, dispatch: dispatchProject } = useProjectState();

    let handleScroll = (e: UIEvent<HTMLDivElement>): void => {
        const top = (e.target as HTMLElement).scrollTop;
        const height = (e.target as HTMLElement).clientHeight;
        const sections = document.querySelectorAll(".page-section") as NodeListOf<HTMLElement>;
        for (const section of sections) {
            const rect = section.getBoundingClientRect();

            // check if section bounds are inside scroll view of e.target
            if (
                (rect.top >= top && rect.top <= height - 100) ||
                (rect.bottom >= top && rect.bottom <= height - 100) ||
                (rect.top <= top && rect.bottom >= height - 100)
            ) {
                const route = section.querySelector(".route");
                if (route) {
                    dispatch({ type: AppActionType.SET_ROUTE, route: route.id as Route });
                    break;
                }
            }
        }

        setScrolled(height - 60 < top);
    };

    const handleAddProject = async (): Promise<void> => {
        const dialogRef: DialogRef<ProjectDocument> = openDialog<ProjectDocument, ProjectDocument>(ProjectDialog, {
            heading: "Add Project",
            full: true,
            width: "90vw",
        });

        const result = await dialogRef.result;
        if (result) {
            dispatchProject({ type: ProjectActionType.ADD_PROJECT, project: result });
        }
    };

    const popupMenuItems: MenuItem[] = [
        {
            label: "Add Project",
            icon: <BiSolidAddToQueue />,
            action: () => handleAddProject(),
        },
        {
            label: "Logout",
            icon: <FaPowerOff />,
            action: () => logout(),
        },
    ];

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Fredoka One", "Google Sans"],
            },
        });
    }, []);

    useEffect(() => {
        const projectMap = groupBy(getProjects(), p => p.category);
        let changedMenuItems = menuItems.map(item => {
            if (item.elementId === Route.WORK_PROJECTS) {
                item.hidden = !projectMap.get(ProjectCategory.WORK)?.length;
            }
            if (item.elementId === Route.PERSONAL_PROJECTS) {
                item.hidden = !projectMap.get(ProjectCategory.PERSONAL)?.length;
            }
            if (item.elementId === Route.COLLABORATION_PROJECTS) {
                item.hidden = !projectMap.get(ProjectCategory.COLLABORATION)?.length;
            }
            if (item.elementId === Route.NPM_PROJECTS) {
                item.hidden = !projectMap.get(ProjectCategory.NPM)?.length;
            }
            return item;
        });
        setMenuItems(changedMenuItems);
    }, [getProjects()]);

    useEffect(() => {
        if (!initialized) {
            const projects = getProjects();
            if (projects.length) {
                setInitialized(true);
            }

            const hash = location.hash;
            if (hash) {
                const projectCode = hash.substring(1);
                if (projectCode) {
                    const project: ProjectDocument | undefined = getProjects().find(p => p.codeName === projectCode);
                    if (project) {
                        openDialog(ProjectViewDialog, {
                            full: true,
                            width: "90vw",
                            data: project,
                        });
                    }
                }
            }
        }
    }, [location, getProjects()]);

    const handleAuth = async (): Promise<void> => {
        if (user) {
            await logout();
        } else {
            openDialog(LoginDialog, { heading: "Login", width: "400px" });
        }
    };

    return (
        <>
            <Header show={scrolled}>
                <Menu items={menuItems} className="text-white" />
                {user ? (
                    <PopupMenu items={popupMenuItems} title={user.email!} />
                ) : (
                    <Button icon={<FaSignInAlt />} className="h-10 w-10" rounded onClick={handleAuth} />
                )}
            </Header>
            <Content onContentScroll={handleScroll}>
                <Home />
                <Page>
                    <AboutMe />
                    <Projects category={ProjectCategory.WORK} route={Route.WORK_PROJECTS} bgSecondary />
                    <Projects category={ProjectCategory.PERSONAL} route={Route.PERSONAL_PROJECTS} />
                    <Projects
                        category={ProjectCategory.COLLABORATION}
                        route={Route.COLLABORATION_PROJECTS}
                        bgSecondary
                    />
                    <Projects category={ProjectCategory.NPM} route={Route.NPM_PROJECTS} description={<NpmProjects />} />
                </Page>
            </Content>
            <ToastContainer theme="colored" />
        </>
    );
}

export default Layout;
