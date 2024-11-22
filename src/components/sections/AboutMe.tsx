// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";

import { Nbsp, Section, StackIcon } from "../index.ts";
import { stackIcon } from "../../data/stack-icons.ts";
import StackItem from "../dialogs/StackItem.tsx";

const AboutMe = (): JSX.Element => {
    return (
        <Section title="About Me" route={Route.ABOUT}>
            <div className="flex flex-wrap gap-5  pb-10">
                {[
                    stackIcon.Angular,
                    stackIcon.Apache,
                    stackIcon.ApacheTomcat,
                    stackIcon.AWS,
                    stackIcon.BitBucket,
                    stackIcon.Bootstrap,
                    stackIcon.ChakraUI,
                    stackIcon.Chrome,
                    stackIcon.CodePen,
                    stackIcon.CPP,
                    stackIcon.CSharp,
                    stackIcon.CSS3,
                    stackIcon.DataGrip,
                    stackIcon.DigitalOcean,
                    stackIcon.Docker,
                    stackIcon.DotNET,
                    stackIcon.ESLint,
                    stackIcon.ExpressJs,
                    stackIcon.FileZilla,
                    stackIcon.Firebase,
                    stackIcon.Firefox,
                    stackIcon.Git,
                    stackIcon.GitHub,
                    stackIcon.GitHubActions,
                    stackIcon.GitLab,
                    stackIcon.Google,
                    stackIcon.GoogleCloud,
                    stackIcon.Handlebars,
                    stackIcon.Heroku,
                    stackIcon.Hibernate,
                    stackIcon.HTML5,
                    stackIcon.IntelliJIDEA,
                    stackIcon.Ionic,
                    stackIcon.Java,
                    stackIcon.JavaScript,
                    stackIcon.Jest,
                    stackIcon.JetBrains,
                    stackIcon.Jira,
                    stackIcon.jQuery,
                    stackIcon.JSON,
                    stackIcon.LinkedIn,
                    stackIcon.Linux,
                    stackIcon.Markdown,
                    stackIcon.MongoDB,
                    stackIcon.MongooseJs,
                    stackIcon.MySQL,
                    stackIcon.NestJs,
                    stackIcon.NextJs,
                    stackIcon.NGINX,
                    stackIcon.NGXS,
                    stackIcon.NodeJs,
                    stackIcon.Nodemon,
                    stackIcon.NPM,
                    stackIcon.NWjs,
                    stackIcon.OpenAPI,
                    stackIcon.Opera,
                    stackIcon.Oracle,
                    stackIcon.Passport,
                    stackIcon.PHP,
                    stackIcon.PhpStorm,
                    stackIcon.PostCSS,
                    stackIcon.PostgreSQL,
                    stackIcon.Postman,
                    stackIcon.Powershell,
                    stackIcon.Prisma,
                    stackIcon.RabbitMQ,
                    stackIcon.RadixUI,
                    stackIcon.ReactJs,
                    stackIcon.ReactBootstrap,
                    stackIcon.ReactQuery,
                    stackIcon.Redis,
                    stackIcon.Redux,
                    stackIcon.Render,
                    stackIcon.Rider,
                    stackIcon.RollupJs,
                    stackIcon.Sass,
                    stackIcon.SocketIo,
                    stackIcon.Spring,
                    stackIcon.SQLite,
                    stackIcon.SSH,
                    stackIcon.StackOverflow,
                    stackIcon.Swagger,
                    stackIcon.TailwindCSS,
                    stackIcon.TypeORM,
                    stackIcon.TypeScript,
                    stackIcon.V8,
                    stackIcon.Vercel,
                    stackIcon.VisualStudio,
                    stackIcon.ViteJs,
                    stackIcon.Webpack,
                    stackIcon.WebStorm,
                    stackIcon.XML,
                    stackIcon.YAML,
                    stackIcon.Yarn,
                    stackIcon.Zustand,
                ].map((icon, index) => (
                    <StackIcon key={index} icon={icon.icon} />
                ))}
            </div>
            <div className="text-xl text-justify" style={{ lineHeight: "35px" }}>
                <p className="pb-5">
                    <Nbsp count={16} />I am a Senior Software Engineer and Full Stack Web Developer with extensive
                    experience in designing, developing, and maintaining web applications. My focus is on creating
                    dynamic and efficient solutions that leverage the latest technologies and best practices to deliver
                    high-quality, scalable, and maintainable software. I am passionate about solving complex problems
                    and continuously improving my skills to stay at the forefront of the industry.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> My primary stack includes{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Angular} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.ReactJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NestJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NextJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Spring} /> &nbsp;coupled
                    with databases such as{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.MongoDB} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.MySQL} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.PostgreSQL} />. &nbsp;In
                    the realm of web applications, I adeptly design front-ends using{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Angular} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.ReactJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NextJs} /> &nbsp;or plain{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.HTML5} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.CSS3} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Bootstrap} />{" "}
                    &nbsp;websites with{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.JavaScript} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.TypeScript} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.jQuery} /> &nbsp;While
                    implementing robust back-ends with{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NodeJs} />{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.ExpressJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NestJs} />,{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.NextJs} /> &nbsp;or{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Java} />
                    &nbsp;&nbsp;
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.Spring} />.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> Expanding beyond web applications, I specialize in designing desktop
                    applications through various technologies. This includes integration of web applications with
                    ElectronJS, as well as standalone applications developed{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.CSharp} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.DotNET} />. &nbsp;Moreover,
                    I possess basic knowledge of{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.AWS} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.GoogleCloud} />{" "}
                    &nbsp;services and can proficiently manage a VPS for web hosting. Additionally, I have experience
                    with <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.PHP} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.CPP} /> &nbsp;and{" "}
                    <StackItem className="relative font-bold top-[6px] ps-2" tool={stackIcon.CSharp} /> &nbsp;rounding
                    out my skill set and enabling me to tackle a diverse range of projects with expertise.
                </p>
            </div>
        </Section>
    );
};

export default AboutMe;
