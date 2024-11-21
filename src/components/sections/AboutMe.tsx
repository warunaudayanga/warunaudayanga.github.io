// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";

import { Nbsp, Section, StackIcon } from "../index.ts";
import { stackIcon } from "../../data/stack-icons.ts";

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
            <div className="text-xl google-sans text-justify" style={{ lineHeight: "35px" }}>
                <p className="pb-5">
                    <Nbsp count={16} />I am a Senior Software Engineer and Full Stack Web Developer with extensive
                    experience in designing, developing, and maintaining web applications. My focus is on creating
                    dynamic and efficient solutions that leverage the latest technologies and best practices to deliver
                    high-quality, scalable, and maintainable software. I am passionate about solving complex problems
                    and continuously improving my skills to stay at the forefront of the industry.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> My primary stack includes{" "}
                    <StackIcon icon={stackIcon.Angular.icon} size="30px" inline /> Angular,{" "}
                    <StackIcon icon={stackIcon.ReactJs.icon} inline /> Reaxt,{" "}
                    <StackIcon icon={stackIcon.NestJs.icon} inline /> Nest.js,{" "}
                    <StackIcon icon={stackIcon.NextJs.icon} inline /> Next.js,{" "}
                    <StackIcon icon={stackIcon.Spring.icon} inline /> Spring Boot, coupled with databases such as{" "}
                    <StackIcon icon={stackIcon.MongoDB.icon} inline /> MongoDB,{" "}
                    <StackIcon icon={stackIcon.MySQL.icon} inline /> MySQL, and{" "}
                    <StackIcon icon={stackIcon.PostgreSQL.icon} inline /> PostgresSQL. In the realm of web applications,
                    I adeptly design front-ends using <StackIcon icon={stackIcon.Angular.icon} size="30px" inline />{" "}
                    Angular, <StackIcon icon={stackIcon.ReactJs.icon} size="30px" inline /> React,{" "}
                    <StackIcon icon={stackIcon.NextJs.icon} size="30px" inline /> Next.js or plain{" "}
                    <StackIcon icon={stackIcon.HTML5.icon} inline /> HTML,{" "}
                    <StackIcon icon={stackIcon.CSS3.icon} inline /> CSS,{" "}
                    <StackIcon icon={stackIcon.Bootstrap.icon} inline /> Bootstrap websites with{" "}
                    <StackIcon icon={stackIcon.JavaScript.icon} inline /> JavaScript,{" "}
                    <StackIcon icon={stackIcon.TypeScript.icon} inline /> Typescript, and{" "}
                    <StackIcon icon={stackIcon.jQuery.icon} inline /> jQuery, While implementing robust back-ends with{" "}
                    <StackIcon icon={stackIcon.NodeJs.icon} inline /> NodeJS{" "}
                    <StackIcon icon={stackIcon.ExpressJs.icon} inline /> Express,{" "}
                    <StackIcon icon={stackIcon.NestJs.icon} inline /> NestJS,{" "}
                    <StackIcon icon={stackIcon.NextJs.icon} inline /> NestJS or{" "}
                    <StackIcon icon={stackIcon.Java.icon} inline /> Java{" "}
                    <StackIcon icon={stackIcon.Spring.icon} inline /> Spring Boot.
                </p>
                <p className="pb-5">
                    <Nbsp count={16} /> Expanding beyond web applications, I specialize in designing desktop
                    applications through various technologies. This includes integration of web applications with
                    ElectronJS, as well as standalone applications developed{" "}
                    <StackIcon icon={stackIcon.CSharp.icon} inline /> C#, and{" "}
                    <StackIcon icon={stackIcon.DotNET.icon} inline /> .Net. Moreover, I possess basic knowledge of{" "}
                    <StackIcon icon={stackIcon.AWS.icon} inline /> AWS and{" "}
                    <StackIcon icon={stackIcon.GoogleCloud.icon} inline /> Google Cloud services and can proficiently
                    manage a VPS for web hosting. Additionally, I have experience with{" "}
                    <StackIcon icon={stackIcon.PHP.icon} inline /> PHP and{" "}
                    <StackIcon icon={stackIcon.CPP.icon} inline /> C++ and{" "}
                    <StackIcon icon={stackIcon.CSharp.icon} inline /> C#, rounding out my skill set and enabling me to
                    tackle a diverse range of projects with expertise.
                </p>
            </div>
        </Section>
    );
};

export default AboutMe;
