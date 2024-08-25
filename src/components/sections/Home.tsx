import { JSX } from "react";
import { BackgroundArt } from "../index.ts";
import { useThemeStore } from "../../stores";
import { Route } from "../../enums";
import avatar from "../../assets/images/avatar.jpg";

const Home = (): JSX.Element => {
    let { setColors } = useThemeStore();

    const handleHueChange = (primaryHue: number, accentHue: number): void => {
        setColors(primaryHue, accentHue);
    };

    return (
        <BackgroundArt changeType="random" onHueChange={handleHueChange}>
            <div className="h-full flex flex-col">
                <div id={Route.HOME} className="h-[450px] flex flex-col items-center justify-center">
                    <div
                        className="bg-no-repeat bg-cover bg-center border-8 rounded-full border-accent"
                        style={{
                            backgroundImage: `url(${avatar})`,
                            height: "200px",
                            width: "200px",
                        }}
                    ></div>
                    <h2 className="text-[60px] fredoka-one text-accent">Hi !, I&apos;m Waruna</h2>
                    <h4 className="text-[30px] fredoka-one text-center text-accent-darker">
                        A Senior Software Engineer
                        <br />
                        specializing in Full Stack Development.
                    </h4>
                </div>
                <div className="flex-grow flex gap-10 justify-center items-center pb-10 fredoka-one text-[40px]">
                    <a href="/#about">
                        <div className="glass text-accent-darker fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
                            About Me
                        </div>
                    </a>
                    <div className="text-accent text-[60px]">|</div>
                    <a href="/#projects">
                        <div className="glass text-accent-darker fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
                            My Projects
                        </div>
                    </a>
                </div>
            </div>
        </BackgroundArt>
    );
};

export default Home;
