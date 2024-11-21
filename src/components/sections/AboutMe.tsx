// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import {
    Angular,
    AWS,
    Bootstrap,
    CPP,
    CSharp,
    CSS3,
    DotNET,
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
    PostgreSQL,
    ReactJs,
    Spring,
    TypeScript,
} from "../../data/stack-icons.ts";
import { Nbsp, Section, StackIcon } from "../index.ts";
import Apache from "../../assets/stack/Apache.svg";
import ApacheTomcat from "../../assets/stack/ApacheTomcat.svg";
import BitBucket from "../../assets/stack/BitBucket.svg";
import ChakraUI from "../../assets/stack/ChakraUI.svg";
import Chrome from "../../assets/stack/Chrome.svg";
import CodePen from "../../assets/stack/CodePen.svg";
import DataGrip from "../../assets/stack/DataGrip.svg";
import DigitalOcean from "../../assets/stack/DigitalOcean.svg";
import Docker from "../../assets/stack/Docker.svg";
import ESLint from "../../assets/stack/ESLint.svg";
import FileZilla from "../../assets/stack/FileZilla.svg";
import Firebase from "../../assets/stack/Firebase.svg";
import Firefox from "../../assets/stack/Firefox.svg";
import Git from "../../assets/stack/Git.svg";
import GitHub from "../../assets/stack/GitHub.svg";
import GitHubActions from "../../assets/stack/GitHubActions.svg";
import GitLab from "../../assets/stack/GitLab.svg";
import Google from "../../assets/stack/Google.svg";
import Handlebars from "../../assets/stack/Handlebars.svg";
import Heroku from "../../assets/stack/Heroku.svg";
import Hibernate from "../../assets/stack/Hibernate.svg";
import IntelliJIDEA from "../../assets/stack/IntelliJIDEA.svg";
import Ionic from "../../assets/stack/Ionic.svg";
import Jest from "../../assets/stack/Jest.svg";
import JetBrains from "../../assets/stack/JetBrains.svg";
import Jira from "../../assets/stack/Jira.svg";
import JSON from "../../assets/stack/JSON.svg";
import LinkedIn from "../../assets/stack/LinkedIn.svg";
import Linux from "../../assets/stack/Linux.svg";
import Markdown from "../../assets/stack/Markdown.svg";
import MongooseJs from "../../assets/stack/MongooseJs.svg";
import NGINX from "../../assets/stack/NGINX.svg";
import NGXS from "../../assets/stack/NGXS.svg";
import Nodemon from "../../assets/stack/Nodemon.svg";
import NPM from "../../assets/stack/NPM.svg";
import NWjs from "../../assets/stack/NWjs.svg";
import OpenAPI from "../../assets/stack/OpenAPI.svg";
import Opera from "../../assets/stack/Opera.svg";
import Oracle from "../../assets/stack/Oracle.svg";
import Passport from "../../assets/stack/Passport.svg";
import PhpStorm from "../../assets/stack/PhpStorm.svg";
import PostCSS from "../../assets/stack/PostCSS.svg";
import Postman from "../../assets/stack/Postman.svg";
import Powershell from "../../assets/stack/Powershell.svg";
import Prisma from "../../assets/stack/Prisma.svg";
import RabbitMQ from "../../assets/stack/RabbitMQ.svg";
import RadixUI from "../../assets/stack/RadixUI.svg";
import ReactBootstrap from "../../assets/stack/ReactBootstrap.svg";
import ReactQuery from "../../assets/stack/ReactQuery.svg";
import Redis from "../../assets/stack/Redis.svg";
import Redux from "../../assets/stack/Redux.svg";
import Render from "../../assets/stack/Render.svg";
import Rider from "../../assets/stack/Rider.svg";
import RollupJs from "../../assets/stack/RollupJs.svg";
import Sass from "../../assets/stack/Sass.svg";
import SocketIo from "../../assets/stack/SocketIo.svg";
import SQLite from "../../assets/stack/SQLite.svg";
import SSH from "../../assets/stack/SSH.svg";
import StackOverflow from "../../assets/stack/StackOverflow.svg";
import Swagger from "../../assets/stack/Swagger.svg";
import TailwindCSS from "../../assets/stack/TailwindCSS.svg";
import TypeORM from "../../assets/stack/TypeORM.svg";
import V8 from "../../assets/stack/V8.svg";
import Vercel from "../../assets/stack/Vercel.svg";
import VisualStudio from "../../assets/stack/VisualStudio.svg";
import ViteJs from "../../assets/stack/ViteJs.svg";
import Webpack from "../../assets/stack/Webpack.svg";
import WebStorm from "../../assets/stack/WebStorm.svg";
import XML from "../../assets/stack/XML.svg";
import YAML from "../../assets/stack/YAML.svg";
import Yarn from "../../assets/stack/Yarn.svg";
import Zustand from "../../assets/stack/Zustand.svg";

const AboutMe = (): JSX.Element => {
    return (
        <Section title="About Me" route={Route.ABOUT}>
            <div className="flex flex-wrap gap-5  pb-10">
                {[
                    Angular,
                    Apache,
                    ApacheTomcat,
                    AWS,
                    BitBucket,
                    Bootstrap,
                    ChakraUI,
                    Chrome,
                    CodePen,
                    CPP,
                    CSharp,
                    CSS3,
                    DataGrip,
                    DigitalOcean,
                    Docker,
                    DotNET,
                    ESLint,
                    ExpressJs,
                    FileZilla,
                    Firebase,
                    Firefox,
                    Git,
                    GitHub,
                    GitHubActions,
                    GitLab,
                    Google,
                    GoogleCloud,
                    Handlebars,
                    Heroku,
                    Hibernate,
                    HTML5,
                    IntelliJIDEA,
                    Ionic,
                    Java,
                    JavaScript,
                    Jest,
                    JetBrains,
                    Jira,
                    jQuery,
                    JSON,
                    LinkedIn,
                    Linux,
                    Markdown,
                    MongoDB,
                    MongooseJs,
                    MySQL,
                    NestJs,
                    NextJs,
                    NGINX,
                    NGXS,
                    NodeJs,
                    Nodemon,
                    NPM,
                    NWjs,
                    OpenAPI,
                    Opera,
                    Oracle,
                    Passport,
                    PHP,
                    PhpStorm,
                    PostCSS,
                    PostgreSQL,
                    Postman,
                    Powershell,
                    Prisma,
                    RabbitMQ,
                    RadixUI,
                    ReactJs,
                    ReactBootstrap,
                    ReactQuery,
                    Redis,
                    Redux,
                    Render,
                    Rider,
                    RollupJs,
                    Sass,
                    SocketIo,
                    Spring,
                    SQLite,
                    SSH,
                    StackOverflow,
                    Swagger,
                    TailwindCSS,
                    TypeORM,
                    TypeScript,
                    V8,
                    Vercel,
                    VisualStudio,
                    ViteJs,
                    Webpack,
                    WebStorm,
                    XML,
                    YAML,
                    Yarn,
                    Zustand,
                ].map((icon, index) => (
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
                    <StackIcon icon={MySQL} inline /> MySQL, and <StackIcon icon={PostgreSQL} inline /> PostgresSQL. In
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
                    <StackIcon icon={DotNET} inline /> .Net. Moreover, I possess basic knowledge of{" "}
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
