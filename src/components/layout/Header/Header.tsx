import { JSX, useEffect, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import "./Header.css";
import { classNames } from "primereact/utils";
import { useLocation } from "react-router-dom";
import { useAppState, useAuth, useDialog } from "../../../hooks";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { LoginDialog, ProjectDialog } from "../../dialogs";
import { Menu } from "primereact/menu";
import { DialogRef, ProjectDocument, ProjectDto } from "../../../interfaces";

const Header = ({ show }: { show?: boolean }): JSX.Element => {
    let location = useLocation();
    const { state } = useAppState();
    const { user, logout } = useAuth();
    const { openDialog } = useDialog();

    const menuRef = useRef<Menubar>(null);
    const popupMenuRef = useRef<OverlayPanel>(null);

    useEffect(() => {
        let items = menuRef.current?.getElement().querySelectorAll(".p-menuitem-content") as NodeListOf<HTMLElement>;
        items.forEach(item => {
            item.classList.remove("active");
        });
        const item = Array.from(items).find(item => item.querySelector("a")?.hash === `#${state.route}`);
        item?.classList.add("active");
    }, [location, state.route]);

    const handleAuth = async (): Promise<void> => {
        if (user) {
            await logout();
        } else {
            openDialog(LoginDialog, { heading: "Login" });
        }
    };

    const handleAddProject = async (): Promise<void> => {
        popupMenuRef.current?.hide();

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
            icon: "pi pi-home",
            url: "#home",
        },
        {
            label: "About Me",
            icon: "pi pi-info-circle",
            url: "#about",
        },
        {
            label: "My Projects",
            icon: "pi pi-box",
            url: "#projects",
        },
        {
            label: "Personal Projects",
            icon: "pi pi-box",
            url: "#personal",
        },
        {
            label: "NPM Libraries",
            icon: "pi pi-clone",
            url: "#npm",
        },
    ];

    const popupMenuItems: MenuItem[] = [
        {
            label: "Add Project",
            icon: "pi pi-plus",
            command: () => handleAddProject(),
        },
        {
            label: "Logout",
            icon: "pi pi-power-off",
            command: () => logout(),
        },
    ];

    const accountOptions = (
        <div className="pr-3">
            {user ? (
                <div>
                    <div
                        className="text-primary-darker bg-accent w-10 h-10 rounded-full flex justify-center items-center font-bold text-xl cursor-pointer"
                        onClick={e => popupMenuRef.current?.toggle(e)}
                    >
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <OverlayPanel ref={popupMenuRef} pt={{ content: { className: "p-0" } }}>
                        <Menu
                            model={popupMenuItems}
                            pt={{ root: { className: "border-none" }, label: { className: "mt-1" } }}
                        />
                    </OverlayPanel>
                </div>
            ) : (
                <Button icon="pi pi-sign-in" className="h-10 w-10" rounded onClick={handleAuth} />
            )}
        </div>
    );

    return (
        <div
            className={classNames({
                header: true,
                show,
            })}
        >
            <Menubar
                ref={menuRef}
                model={menuItems}
                end={accountOptions}
                className="rounded-none max-w-screen-xl m-auto"
            ></Menubar>
        </div>
    );
};

export default Header;
