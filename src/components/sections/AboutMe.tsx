// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import stackIcons, {
    Angular,
    AWS,
    Bootstrap,
    CPP,
    CSharp,
    CSS3,
    DotNet,
    ExpressJs,
    GoogleCloud,
    HTML5,
    Java,
    JavaScript,
    jQuery,
    MongoDB,
    MySQL,
    NestJs,
    NextJs,
    NodeJs,
    PHP,
    PostgresSQL,
    ReactJs,
    Spring,
    TypeScript,
} from "../../data/stack-icons.ts";
import { Section, Nbsp, StackIcon } from "../index.ts";

const AboutMe = (): JSX.Element => {
    return (
        <Section title="About Me" route={Route.ABOUT}>
            <div className="flex flex-wrap gap-5  pb-10">
                {stackIcons.map((icon, index) => (
                    <StackIcon key={index} icon={icon} />
                ))}
            </div>
            <div className="text-xl google-sans text-justify" style={{ lineHeight: "35px" }}>
                <p className="pb-5">
                    <Nbsp count={16} />I am a Senior Software Engineer and Full Stack Web Developer with extensive
                    experience in designing, developing, and maintaining web applications. My focus is on creating
                    dynamic and efficient solutions that leverage the latest technologies and best practices to deliver
                    high-quality, scalable, and maintainable software. I am passionate about solving complex problems
                    and continuously improving my skills to stay at the forefront of the industry.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> My primary stack includes <StackIcon icon={Angular} size="30px" inline />{" "}
                    Angular, <StackIcon icon={ReactJs} inline /> Reaxt, <StackIcon icon={NestJs} inline /> Nest.js,{" "}
                    <StackIcon icon={NextJs} inline /> Next.js, <StackIcon icon={Spring} inline /> Spring Boot, coupled
                    with databases such as <StackIcon icon={MongoDB} inline /> MongoDB,{" "}
                    <StackIcon icon={MySQL} inline /> MySQL, and <StackIcon icon={PostgresSQL} inline /> PostgresSQL. In
                    the realm of web applications, I adeptly design front-ends using{" "}
                    <StackIcon icon={Angular} size="30px" inline /> Angular,{" "}
                    <StackIcon icon={ReactJs} size="30px" inline /> React,{" "}
                    <StackIcon icon={NextJs} size="30px" inline /> Next.js or plain <StackIcon icon={HTML5} inline />{" "}
                    HTML, <StackIcon icon={CSS3} inline /> CSS, <StackIcon icon={Bootstrap} inline /> Bootstrap websites
                    with <StackIcon icon={JavaScript} inline /> JavaScript, <StackIcon icon={TypeScript} inline />{" "}
                    Typescript, and <StackIcon icon={jQuery} inline /> jQuery, While implementing robust back-ends with{" "}
                    <StackIcon icon={NodeJs} inline /> NodeJS <StackIcon icon={ExpressJs} inline /> Express,{" "}
                    <StackIcon icon={NestJs} inline /> NestJS, <StackIcon icon={NextJs} inline /> NestJS or{" "}
                    <StackIcon icon={Java} inline /> Java <StackIcon icon={Spring} inline /> Spring Boot.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> Expanding beyond web applications, I specialize in designing desktop
                    applications through various technologies. This includes integration of web applications with
                    ElectronJS, as well as standalone applications developed <StackIcon icon={CSharp} inline /> C#, and{" "}
                    <StackIcon icon={DotNet} inline /> .Net. Moreover, I possess basic knowledge of{" "}
                    <StackIcon icon={AWS} inline /> AWS and <StackIcon icon={GoogleCloud} inline /> Google Cloud
                    services and can proficiently manage a VPS for web hosting. Additionally, I have experience with{" "}
                    <StackIcon icon={PHP} inline /> PHP and <StackIcon icon={CPP} inline /> C++ and{" "}
                    <StackIcon icon={CSharp} inline /> C#, rounding out my skill set and enabling me to tackle a diverse
                    range of projects with expertise.
                </p>
            </div>
        </Section>
    );
};

export default AboutMe;
