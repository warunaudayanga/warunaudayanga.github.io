import { JSX } from "react";
import githubLogo from "../../assets/images/logos/github.png";
import npmLogo from "../../assets/images/logos/npm.png";
import facebookLogo from "../../assets/images/logos/facebook.png";
import gmailLogo from "../../assets/images/logos/gmail.png";

const NpmProjects = (): JSX.Element => {
    return (
        <>
            <p className="text-xl mb-3">
                As a hobby, I have started creating some npm packages to support the development of my projects.
                Currently, these packages are intended for personal use, as they are still under active development.
                However, I have decided to publish them on npm for convenience. I have created a brand for my packages
                called Hichchi Dev.
            </p>
            <div className="flex gap-4 mb-3">
                <div className="flex gap-2 items-center mb-3">
                    <img alt="logo" className="w-[30px]" src={githubLogo} />
                    <a className="underline" href="https://github.com/hichchidev" target="_blank" rel="noreferrer">
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center mb-3">
                    <img alt="logo" className="w-[30px]" src={npmLogo} />
                    <a className="underline" href="https://www.npmjs.com/~hichchidev" target="_blank" rel="noreferrer">
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center mb-3">
                    <img alt="logo" className="w-[30px]" src={facebookLogo} />
                    <a
                        className="underline"
                        href="https://web.facebook.com/hichchidev"
                        target="_blank"
                        rel="noreferrer"
                    >
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center mb-3">
                    <img alt="logo" className="w-[30px]" src={gmailLogo} />
                    <a className="underline" href="mailto:hichchidev@gmail.com">
                        hichchidev@gmail.com
                    </a>
                </div>
            </div>
            <p className="text-xl mb-10">
                Below are my ongoing npm projects. Please note that documentation may not yet be available, as these
                projects are still in progress.
            </p>
        </>
    );
};

export default NpmProjects;
