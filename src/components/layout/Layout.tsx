import { JSX, UIEvent, useEffect, useState } from "react";
import {
    AboutMe,
    Button,
    Content,
    Header,
    Home,
    LoginDialog,
    Menu,
    MyProjects,
    NPMLibraries,
    Page,
    PersonalProjects,
    PopupMenu,
    ProjectDialog,
} from "../index.ts";
import { useAppState, useAuth, useDialog } from "../../hooks";
import { FaHome, FaInfoCircle, FaPowerOff, FaSignInAlt } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { VscGithubProject } from "react-icons/vsc";
import { BiSolidAddToQueue } from "react-icons/bi";
import { DialogRef, MenuItem, ProjectDocument, ProjectDto } from "../../interfaces";
import { AppActionType } from "../../reducers";
import { Route } from "../../enums";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";

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
        const dialogRef: DialogRef<ProjectDto> = openDialog<ProjectDocument, ProjectDocument>(ProjectDialog, {
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
            url: "#home",
        },
        {
            label: "About Me",
            icon: <FaInfoCircle />,
            url: "#about",
        },
        {
            label: "My Projects",
            icon: <VscGithubProject />,
            url: "#projects",
        },
        {
            label: "Personal Projects",
            icon: <VscGithubProject />,
            url: "#personal",
        },
        {
            label: "NPM Libraries",
            icon: <GrProjects />,
            url: "#npm",
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
                    <MyProjects />
                    <PersonalProjects />
                    <NPMLibraries />
                </Page>
            </Content>
            <ToastContainer theme="colored" />
        </>
    );
}

export default Layout;
