// noinspection SpellCheckingInspection

import { JSX, useEffect, useState } from "react";
import { Route } from "../../enums";

import { Section, StackIcon } from "../index.ts";
import { stackIcon, StackIconType } from "../../data/stack-icons.ts";
import StackItem from "../dialogs/StackItem.tsx";

const AboutMe = (): JSX.Element => {
    const Icon = ({ tool }: { tool: StackIconType }): JSX.Element => (
        <StackItem size="20px" className="relative font-bold text-[17px] top-[4px] ps-1" tool={tool} />
    );

    const icons = [
        stackIcon.Angular,
        stackIcon.Apache,
        stackIcon.ApacheTomcat,
        stackIcon.AWS,
        stackIcon.BitBucket,
        stackIcon.Bootstrap,
        stackIcon.ChakraUI,
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
        stackIcon.Oracle,
        stackIcon.Passport,
        stackIcon.PHP,
        stackIcon.PhpStorm,
        stackIcon.PostCSS,
        stackIcon.PostgreSQL,
        stackIcon.Postman,
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
        stackIcon.Vercel,
        stackIcon.VisualStudio,
        stackIcon.ViteJs,
        stackIcon.Webpack,
        stackIcon.WebStorm,
        stackIcon.XML,
        stackIcon.YAML,
        stackIcon.Yarn,
        stackIcon.Zustand,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeOpacity, setFadeOpacity] = useState(1); // For fade effect
    const iconsPerPage = 30;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeOpacity(0); // Start fade out
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + iconsPerPage) % icons.length);
                setFadeOpacity(1);
            }, 1000);
        }, 3000);

        return (): void => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <Section title="About Me" route={Route.ABOUT}>
            <div className="flex gap-10">
                <div
                    className="text-lg text-[17px] text-justify"
                    style={{ lineHeight: "30px", width: "calc(100% - 130px)" }}
                >
                    <p className="pb-5">
                        With over <span className="font-bold">6 years</span> of experience in the software industry, I
                        have honed my expertise in designing, developing, and maintaining high-quality web and desktop
                        applications. I specialize in creating dynamic, scalable, and efficient solutions tailored to
                        business needs while ensuring exceptional user experiences. Holding a{" "}
                        <span className="font-bold">BSc (Hons) in Computing</span>, I have successfully contributed as a{" "}
                        <span className="font-bold">Senior Software Engineer (SSE)</span> and served as a Team Lead on a
                        key project, showcasing my leadership and collaborative skills.
                    </p>
                    <p className="pb-5">
                        My primary stack includes <Icon tool={stackIcon.Angular} />, <Icon tool={stackIcon.ReactJs} />,{" "}
                        <Icon tool={stackIcon.NestJs} />, <Icon tool={stackIcon.NextJs} />,{" "}
                        <Icon tool={stackIcon.Spring} />, coupled with databases such as{" "}
                        <Icon tool={stackIcon.MongoDB} />, <Icon tool={stackIcon.MySQL} />, and{" "}
                        <Icon tool={stackIcon.PostgreSQL} />. In the realm of web applications, I adeptly design
                        front-ends using <Icon tool={stackIcon.Angular} />, <Icon tool={stackIcon.ReactJs} />,{" "}
                        <Icon tool={stackIcon.NextJs} />, or plain <Icon tool={stackIcon.HTML5} />,{" "}
                        <Icon tool={stackIcon.CSS3} />, and <Icon tool={stackIcon.Bootstrap} /> websites with{" "}
                        <Icon tool={stackIcon.JavaScript} />, <Icon tool={stackIcon.TypeScript} />, and{" "}
                        <Icon tool={stackIcon.jQuery} />. I also implement robust back-ends with{" "}
                        <Icon tool={stackIcon.NodeJs} />, <Icon tool={stackIcon.ExpressJs} />,{" "}
                        <Icon tool={stackIcon.NestJs} />, <Icon tool={stackIcon.NextJs} />, or{" "}
                        <Icon tool={stackIcon.Java} /> and <Icon tool={stackIcon.Spring} />.
                    </p>
                    <p>
                        Expanding beyond web applications, I specialize in designing desktop applications through
                        various technologies. This includes integration of web applications with{" "}
                        <Icon tool={stackIcon.Electron} />, as well as standalone applications developed with{" "}
                        <Icon tool={stackIcon.CSharp} /> and <Icon tool={stackIcon.DotNET} />. Moreover, I possess basic
                        knowledge of <Icon tool={stackIcon.AWS} /> and <Icon tool={stackIcon.GoogleCloud} /> services
                        and can proficiently manage a VPS for web hosting. Additionally, I have experience with{" "}
                        <Icon tool={stackIcon.PHP} />, <Icon tool={stackIcon.CPP} />, and{" "}
                        <Icon tool={stackIcon.CSharp} />, rounding out my skill set and enabling me to tackle a diverse
                        range of projects with expertise.
                    </p>
                </div>
                <div className="overflow-hidden w-[125px] h-[450px]">
                    <div
                        className="flex flex-wrap gap-5 transition-opacity duration-1000"
                        style={{
                            opacity: fadeOpacity,
                        }}
                    >
                        {icons.slice(currentIndex, currentIndex + iconsPerPage).map((icon, index) => (
                            <StackIcon key={index} icon={icon.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AboutMe;
