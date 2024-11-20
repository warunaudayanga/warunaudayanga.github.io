import { JSX, UIEvent, useEffect, useState } from "react";
import { AboutMe, Button, Content, Header, Home, LoginDialog, Menu, Page, PopupMenu, ProjectDialog } from "../index.ts";
import { useAppState, useAuth, useDialog } from "../../hooks";
import { FaHome, FaInfoCircle, FaPowerOff, FaSignInAlt } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { VscGithubProject } from "react-icons/vsc";
import { BiSolidAddToQueue } from "react-icons/bi";
import { DialogRef, MenuItem, ProjectDocument } from "../../interfaces";
import { AppActionType } from "../../reducers";
import { Route } from "../../enums";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import { Projects } from "../sections";
import { ProjectCategory } from "../../enums/project-category.enum.ts";

function Layout(): JSX.Element {
    const [scrolled, setScrolled] = useState(false);

    const { user, logout } = useAuth();
    const { openDialog } = useDialog();
    const { dispatch } = useAppState();

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

        // eslint-disable-next-line no-console
        console.log(await dialogRef.result);
    };

    const menuItems: MenuItem[] = [
        {
            label: "Home",
            icon: <FaHome />,
            url: "#",
            elementId: Route.HOME,
        },
        {
            label: "About Me",
            icon: <FaInfoCircle />,
            url: "#",
            elementId: Route.ABOUT,
        },
        {
            label: "Work",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.WORK_PROJECTS,
        },
        {
            label: "Personal",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.PERSONAL_PROJECTS,
        },
        {
            label: "Collaboration",
            icon: <VscGithubProject />,
            url: "#",
            elementId: Route.COLLABORATION_PROJECTS,
        },
        {
            label: "NPM Libraries",
            icon: <GrProjects />,
            url: "#",
            elementId: Route.NPM_PROJECTS,
        },
    ];

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
                    <Projects category={ProjectCategory.WORK} route={Route.WORK_PROJECTS} />
                    <Projects category={ProjectCategory.PERSONAL} route={Route.PERSONAL_PROJECTS} />
                    <Projects category={ProjectCategory.COLLABORATION} route={Route.COLLABORATION_PROJECTS} />
                    <Projects category={ProjectCategory.NPM} route={Route.NPM_PROJECTS} />
                </Page>
            </Content>
            <ToastContainer theme="colored" />
        </>
    );
}

export default Layout;
