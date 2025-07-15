import { JSX } from "react";
import githubLogo from "../../assets/images/logos/github.png";
import npmLogo from "../../assets/images/logos/npm.png";
import facebookLogo from "../../assets/images/logos/facebook.png";
import gmailLogo from "../../assets/images/logos/gmail.png";

const NpmProjects = (): JSX.Element => {
    return (
        <div className="px-5">
            <p className="text-xl mb-3">
                As a hobby, I’ve started developing a collection of npm packages to support and accelerate the
                development of my own projects. While these packages are still evolving and primarily intended for
                personal use, I’ve published them on npm for convenience and reusability. I release them under the brand
                hichchi, while I refer to myself in this context as Hichchi Dev—my developer persona behind the work.
            </p>
            <div className="flex gap-4 mb-6 flex-wrap justify-center">
                <div className="flex gap-2 items-center">
                    <img alt="logo" className="w-[30px]" src={githubLogo} />
                    <a className="underline" href="https://github.com/hichchidev" target="_blank" rel="noreferrer">
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center">
                    <img alt="logo" className="w-[30px]" src={npmLogo} />
                    <a className="underline" href="https://www.npmjs.com/~hichchidev" target="_blank" rel="noreferrer">
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center">
                    <img alt="logo" className="w-[30px]" src={facebookLogo} />
                    <a
                        className="underline"
                        href="https://web.facebook.com/hichchid3v"
                        target="_blank"
                        rel="noreferrer"
                    >
                        hichchidev
                    </a>
                </div>
                <div className="flex gap-2 items-center">
                    <img alt="logo" className="w-[30px]" src={gmailLogo} />
                    <a className="underline" href="mailto:hichchidev@gmail.com">
                        hichchidev@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NpmProjects;
