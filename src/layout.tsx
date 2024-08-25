import { JSX, UIEvent, useEffect, useState } from "react";
import { Header, Content, Page } from "./components";
import { Home, AboutMe, MyProjects, NPMLibraries } from "./components/sections";
import { useAppState } from "./hooks";
import { AppActionType } from "./reducers";
import { Route } from "./enums";
import WebFont from "webfontloader";
import "primeicons/primeicons.css";
import "./layout.css";
import PersonalProjects from "./components/sections/PersonalProjects.tsx";

function Layout(): JSX.Element {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Fredoka One", "Google Sans"],
            },
        });
    }, []);

    const [scrolled, setScrolled] = useState(false);
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

    return (
        <>
            <Header show={scrolled} />
            <Content onContentScroll={handleScroll}>
                <Home />
                <Page>
                    <AboutMe />
                    <MyProjects />
                    <PersonalProjects />
                    <NPMLibraries />
                </Page>
            </Content>
        </>
    );
}

export default Layout;
