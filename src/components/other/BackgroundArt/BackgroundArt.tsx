/* eslint-disable no-param-reassign */
import { JSX, MouseEvent, ReactNode, useEffect } from "react";
import "./BackgroundArt.css";

interface Props {
    height?: string;
    primaryHue?: number;
    accentHue?: number;
    children?: ReactNode;
    changeType?: "auto" | "mouse" | "random";
    onHueChange?: (primaryHue: number, accentHue: number) => void;
}

const validateHue = (hue?: number): void => {
    if (hue === undefined) {
        return;
    }
    if (hue < 0 || hue > 360) {
        throw new Error("Hue must be between 0 and 360");
    }
};

const setColors = (primaryHue: number, accentHue: number | string): void => {
    const artWrapper = document.querySelector(".art-wrapper") as HTMLElement | null;
    artWrapper?.style.setProperty("--primary-shade-1", `hsl(${primaryHue}, 80%, 19%)`);
    artWrapper?.style.setProperty("--primary-shade-2", `hsl(${primaryHue}, 77%, 23%)`);
    artWrapper?.style.setProperty("--primary-shade-3", `hsl(${primaryHue}, 79%, 20%)`);
    artWrapper?.style.setProperty("--primary-shade-4", `hsl(${primaryHue}, 79%, 18%)`);
    artWrapper?.style.setProperty("--primary-shade-5", `hsl(${primaryHue}, 80%, 19%)`);
    artWrapper?.style.setProperty("--primary-shade-6", `hsl(${primaryHue}, 79%, 21%)`);
    artWrapper?.style.setProperty("--primary-shade-7", `hsl(${primaryHue}, 80%, 18%)`);
    artWrapper?.style.setProperty("--primary-shade-8", `hsl(${primaryHue}, 80%, 19%)`);
    artWrapper?.style.setProperty("--primary-shade-9", `hsl(${primaryHue}, 77%, 23%)`);
    artWrapper?.style.setProperty("--primary-shade-10", `hsl(${primaryHue}, 77%, 23%)`);
    artWrapper?.style.setProperty("--primary-shade-11", `hsl(${primaryHue}, 79%, 20%)`);
    artWrapper?.style.setProperty("--primary-shade-12", `hsl(${primaryHue}, 75%, 28%)`);
    artWrapper?.style.setProperty("--accent-color", `hsl(${accentHue}, 97%, 84%)`);
};

const autoHueChange = (
    onHueChange: ((primaryHue: number, accentHue: number, accentColor: string) => void) | undefined,
): void => {
    const primaryHue = 163;
    const accentHue = 45;
    const hueRange = 360;
    const timeout = 200;
    let count = 0;

    let hueOffset = 0;

    const updateHue = (): void => {
        setColors(primaryHue + hueOffset, accentHue + hueOffset);
        count++;
        hueOffset = (hueOffset + 1) % hueRange; // Increment hue offset

        if (onHueChange) {
            requestAnimationFrame(() => {
                onHueChange(primaryHue + hueOffset, accentHue + hueOffset, `hsl(${accentHue + hueOffset}, 97%, 84%)`);
            });
        }
    };

    setInterval(updateHue, timeout);
};

const mouseHueChange = (
    e: MouseEvent,
    onHueChange: ((primaryHue: number, accentHue: number, accentColor: string) => void) | undefined,
): void => {
    const rect = e.currentTarget as HTMLElement;
    const rectBounds = rect.getBoundingClientRect();

    let x = e.clientX - rectBounds.left;
    let y = e.clientY - rectBounds.top;

    x = Math.max(0, Math.min(x, rectBounds.width));
    y = Math.max(0, Math.min(y, rectBounds.height));

    const wPercent = x / rectBounds.width;
    const hPercent = y / rectBounds.height;

    const primaryHue = wPercent * 360;
    const accentHue = hPercent * 360;

    setColors(primaryHue, accentHue);

    if (onHueChange) {
        requestAnimationFrame(() => {
            onHueChange(primaryHue, accentHue, `hsl(${accentHue}, 97%, 84%)`);
        });
    }
};

const BackgroundArt = ({
    height = "100%",
    primaryHue = 163,
    accentHue = 45,
    changeType,
    children,
    onHueChange,
}: Props): JSX.Element => {
    validateHue(primaryHue);
    validateHue(accentHue);

    useEffect(() => {
        if (!changeType) {
            setColors(primaryHue, accentHue);
        } else if (changeType === "random") {
            primaryHue = Math.floor(Math.random() * 360);
            accentHue = primaryHue + 180;
        }
        setColors(primaryHue, accentHue);

        if (onHueChange) {
            requestAnimationFrame(() => {
                onHueChange(primaryHue, accentHue);
            });
        }

        if (changeType === "auto") {
            autoHueChange(onHueChange);
        }
    }, []);

    const handleMouseMove = (e?: MouseEvent): void => {
        if (changeType === "mouse") {
            if (e?.currentTarget) {
                mouseHueChange(e, onHueChange);
            }
        }
    };

    return (
        <>
            <div className="art-wrapper" style={{ height }} onMouseMove={handleMouseMove}>
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 920">
                    <rect className="primary-shade-1" x=".3" width="2400.38" height="920" />
                    <polygon className="no-fill" points="2400 33.69 2400.67 33.3 2400.67 32.87 2400 33.26 2400 33.69" />
                    <polygon
                        className="no-fill"
                        points="2400 198.89 2400.67 198.51 2400.67 198.42 2400 198.81 2400 198.89"
                    />
                    <path className="primary-shade-8" d="M614.99,410.96c.06-.03.13-.06.19-.09h0s-.18.09-.18.09Z" />
                    <polygon
                        className="primary-shade-8"
                        points="458.65 173.82 0 438.62 0 438.65 458.65 173.84 458.65 173.82"
                    />
                    <polygon
                        className="primary-shade-8"
                        points="458.65 10.04 0 274.84 0 274.88 458.65 10.08 458.65 10.04"
                    />
                    <path
                        className="primary-shade-8"
                        d="M1565.43,680.81l-.03-.06,834.6-481.86v-.08l-1249.13,721.19h.3l414.1-239.08c.06-.04.11-.07.16-.11Z"
                    />
                    <path
                        className="primary-shade-8"
                        d="M1323.99,654.93l79.87-46.12c-31.54,10.53-67.17-2.13-84.44-32.05-19.26-33.35-8.55-75.76,23.74-96.13l418.58-241.67c32.94-14.53,72.22-2.23,90.63,29.66,17.63,30.53,10.14,68.64-16.02,90.49L2400,33.69v-.43l-318.47,183.87c-31.98,11.66-68.67-.92-86.28-31.42-18.65-32.3-9.2-73.1,20.75-94.14l-409.16,236.23-.03-.06c-33.81,17.91-76.01,5.99-95.3-27.42-17.85-30.91-9.95-69.59,17.01-91.31l-98.68,56.97-553.34,319.47c33.33-15.91,73.81-3.75,92.59,28.78,19.73,34.18,8.02,77.88-26.16,97.62l-67.06,38.72c32.66-13.61,71.12-1.2,89.28,30.25,17.71,30.67,10.08,69-16.37,90.81l199.23-115.03c-9.04,4.1-19.06,6.4-29.63,6.4-39.67,0-71.82-32.16-71.82-71.82s32.16-71.82,71.82-71.82,71.82,32.16,71.82,71.82c0,24.09-11.87,45.4-30.08,58.43l163.69-94.51c.06-.04.11-.07.16-.11l-.03-.06Z"
                    />
                    <polygon
                        className="primary-shade-8"
                        points="1370.57 137.22 1538.39 40.33 1608.24 0 1607.32 0 1219.67 223.81 1370.57 137.22"
                    />
                    <path
                        className="primary-shade-8"
                        d="M771.75,563.43c-19.29-33.41-8.52-75.91,23.9-96.24l-.03-.06,214.91-123.32c-32.63,13.51-71,1.1-89.13-30.31-16.35-28.31-11.1-63.15,10.61-85.49l-316.22,182.57c33.4-16.18,74.12-4.05,92.97,28.6,19.73,34.18,8.02,77.88-26.16,97.62l-111.01,64.09c31.8-11.18,68.05,1.45,85.51,31.7,16.29,28.21,11.14,62.9-10.37,85.25l217.72-125.7c-33.35,15.99-73.9,3.85-92.7-28.71Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M458.65,10.04v.04l7.96-4.6c32.07-11.89,68.97.68,86.64,31.3,19.21,33.27,8.61,75.57-23.5,95.99l-71.11,41.05v.02l190.38-109.92L759.76,0h-286.22c-2.66,2.31-5.51,4.45-8.56,6.39l-6.32,3.65Z"
                    />
                    <path
                        className="accent-color"
                        d="M625.29,160.06c17.13,29.67,52.31,42.37,83.66,32.31l220.26-126.49L1042.97,0h-283.21l-110.73,63.93c-32.29,20.37-42.99,62.78-23.74,96.13Z"
                    />
                    <path
                        className="primary-shade-7"
                        d="M708.95,192.36c-31.34,10.06-66.53-2.64-83.66-32.31-19.26-33.35-8.55-75.76,23.74-96.13l-190.38,109.92L0,438.65v162.52l543.62-313.86,165.33-94.94Z"
                    />
                    <path
                        className="accent-color"
                        d="M614.99,410.96l.18-.11c-33.81,17.91-76.01,5.99-95.3-27.42-19.26-33.35-8.55-75.76,23.74-96.13L0,601.16v164.7l611.14-352.84c1.27-.73,2.56-1.41,3.86-2.06Z"
                    />
                    <path
                        className="accent-color"
                        d="M1995.25,185.71c17.61,30.5,54.3,43.08,86.28,31.42l318.47-183.87.67-.39V0h-226.06l-158.6,91.57c-29.95,21.04-39.41,61.84-20.75,94.14Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M929.25,65.94c-32.42,20.33-43.19,62.83-23.9,96.24,15.7,27.2,46.57,40.12,75.75,34.34L1321.47,0h-278.51l-113.75,65.88.03.06Z"
                    />
                    <path
                        className="primary-shade-11"
                        d="M945.3,217.26l-.03-.06,35.83-20.69c-29.18,5.78-60.05-7.15-75.75-34.34-19.29-33.41-8.52-75.91,23.9-96.24l-.03-.06-220.26,126.49-165.33,94.94c-32.29,20.37-42.99,62.78-23.74,96.13,19.29,33.41,61.48,45.33,95.3,27.42h0c.2-.09.4-.18.6-.27l316.22-182.57c3.91-4.02,8.35-7.65,13.3-10.75ZM594.41,367.12c-15.5,0-28.06-12.56-28.06-28.06s12.56-28.06,28.06-28.06,28.06,12.56,28.06,28.06-12.56,28.06-28.06,28.06ZM664.45,314.1c-8.5,0-15.38-6.89-15.38-15.38s6.89-15.38,15.38-15.38,15.38,6.89,15.38,15.38-6.89,15.38-15.38,15.38ZM716.02,278.58c-4.54,0-8.22-3.68-8.22-8.22s3.68-8.22,8.22-8.22,8.22,3.68,8.22,8.22-3.68,8.22-8.22,8.22Z"
                    />
                    <path
                        className="primary-shade-3"
                        d="M945.27,217.2l.03.06c-4.95,3.1-9.39,6.73-13.3,10.75-21.71,22.34-26.95,57.18-10.61,85.49,18.13,31.41,56.51,43.82,89.13,30.31l209.13-120L1607.32,0h-285.84l-340.38,196.52-35.83,20.69Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M571.59,600.88l111.01-64.09c34.18-19.73,45.89-63.44,26.16-97.62-18.85-32.65-59.57-44.77-92.97-28.6-.2.1-.4.19-.6.29-.06.03-.13.06-.19.09-1.3.65-2.58,1.32-3.86,2.06L0,765.86v154.14h16.37l543.12-313.57c3.92-2.27,7.98-4.1,12.1-5.55Z"
                    />
                    <path
                        className="accent-color"
                        d="M657.1,632.59c-17.47-30.25-53.71-42.88-85.51-31.7-4.13,1.45-8.18,3.28-12.1,5.55L16.37,920h280.21l350.15-202.16c21.51-22.35,26.66-57.04,10.37-85.25Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M875.89,750.57l67.06-38.72c34.18-19.73,45.89-63.44,26.16-97.62-18.78-32.53-59.26-44.68-92.59-28.78l-9.43,5.45-.03-.06c-.86.45-1.73.88-2.59,1.29l-217.72,125.7-350.15,202.16h145.42c-.38-.54-.61-1.19-.61-1.9,0-1.82,1.47-3.29,3.29-3.29s3.29,1.47,3.29,3.29c0,.71-.23,1.36-.61,1.9h133.81l286.37-165.33c2.72-1.57,5.51-2.92,8.33-4.1ZM913.79,643.97c1.82,0,3.29,1.47,3.29,3.29s-1.47,3.29-3.29,3.29-3.29-1.47-3.29-3.29,1.47-3.29,3.29-3.29ZM887.49,659.16c1.82,0,3.29,1.47,3.29,3.29s-1.47,3.29-3.29,3.29-3.29-1.47-3.29-3.29,1.47-3.29,3.29-3.29ZM470.99,906.21c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM496.84,891.29c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM523.14,876.1c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM549.29,861.01c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM575.03,846.14c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM601.21,831.03c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM627.06,816.11c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM653.36,800.92c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM679.51,785.82c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM705.25,770.96c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM731.43,755.85c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM757.27,740.93c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM783.58,725.74c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM809.72,710.64c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM835.47,695.78c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM861.65,680.67c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29Z"
                    />
                    <path
                        className="primary-shade-9"
                        d="M965.17,780.82c-18.16-31.46-56.63-43.86-89.28-30.25-2.82,1.18-5.61,2.53-8.33,4.1l-286.37,165.33h283.84l83.78-48.37c26.45-21.81,34.07-60.14,16.37-90.81Z"
                    />
                    <path
                        className="primary-shade-1"
                        d="M1346.71,233.51c-19.29-33.41-8.52-75.91,23.9-96.24l-.03-.06-150.91,86.59-209.13,120-214.91,123.32.03.06c-32.42,20.33-43.19,62.83-23.9,96.24,18.8,32.56,59.35,44.7,92.7,28.71.87-.42,1.74-.84,2.59-1.29l.03.06,9.43-5.45,553.34-319.47c-31.21,9.76-66.11-2.97-83.14-32.48Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M1346.71,233.51c17.04,29.51,51.93,42.24,83.14,32.48l98.68-56.97c2.18-1.75,4.47-3.41,6.89-4.93l-.03-.06,70.9-40.93c-31.43,10.26-66.8-2.42-83.99-32.2-17.65-30.56-10.12-68.72,16.1-90.57l-167.82,96.89.03.06c-32.42,20.33-43.19,62.83-23.9,96.24Z"
                    />
                    <path
                        className="accent-color"
                        d="M1522.29,130.9c17.19,29.77,52.57,42.46,83.99,32.2L1888.77,0h-280.53l-69.85,40.33c-26.23,21.84-33.75,60-16.1,90.57Z"
                    />
                    <path
                        className="primary-shade-10"
                        d="M1535.38,204.03l.03.06c-2.42,1.52-4.71,3.18-6.89,4.93-26.96,21.71-34.86,60.39-17.01,91.31,19.29,33.41,61.48,45.33,95.3,27.42l.03.06,409.16-236.23L2174.61,0h-285.84l-282.49,163.09-70.9,40.93Z"
                    />
                    <path
                        className="primary-shade-6"
                        d="M2400.67,198.42v-.09l-1005.23,580.37-.03-.06c-33.81,17.91-76.01,5.99-95.3-27.42-19.26-33.35-8.55-75.76,23.74-96.13l-163.69,94.51c-3.78,2.71-7.84,5.06-12.12,7l-199.23,115.03-83.78,48.37h285.84L2400,198.81l.67-.39Z"
                    />
                    <path
                        className="primary-shade-3"
                        d="M1836.35,359.12c-.12.1-.25.21-.38.31L2380.3,45.16c6.52-3.77,13.39-6.38,20.38-7.92v-3.94l-.67.39-563.65,325.42Z"
                    />
                    <path
                        className="primary-shade-3"
                        d="M1403.86,608.81l-79.87,46.12.03.06c-.06.04-.11.07-.16.11l80.42-46.43c-.14.05-.28.1-.42.15Z"
                    />
                    <path
                        className="primary-shade-12"
                        d="M1835.97,359.42c-2.31,1.9-4.74,3.69-7.34,5.33l-418.58,241.67c-1.9.84-3.83,1.58-5.77,2.24l-80.42,46.43c-32.29,20.37-42.99,62.78-23.74,96.13,19.29,33.41,61.48,45.33,95.3,27.42l.03.06,1005.23-580.37V37.24c-6.98,1.54-13.85,4.15-20.38,7.92l-544.33,314.27Z"
                    />
                    <path
                        className="primary-shade-2"
                        d="M2400.7,363.3V198.6l-835.4,482.3c0,0,0,0-0.1,0l-414,239h285.2l198.1-114.4c-10.4,5.1-21.6,7.4-32.6,7.1c11,0.2,22.1-2.1,32.6-7.1L2400.7,363.3z"
                    />
                    <path
                        className="primary-shade-3"
                        d="M1565.4,680.75l.03.06c-.06.04-.11.07-.16.11l835.41-482.32v-.09l-.67.39-834.6,481.86Z"
                    />
                    <path
                        className="accent-color"
                        d="M1730.9,585.1c-32.3,20.4-43,62.8-23.7,96.1l0,0c18.8,32.7,59.6,44.8,93,28.6l600.5-346.7V198.4L1730.9,585.1z"
                    />
                    <path
                        className="primary-shade-5"
                        d="M2400.67,363.28l-766.15,442.34-198.12,114.38h280l684.27-395.06v-161.66ZM1640.91,885.82c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1666.65,870.96c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1692.83,855.85c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1718.68,840.93c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1744.98,825.74c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1771.13,810.64c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1796.87,795.78c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1823.05,780.67c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1848.89,765.74c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1875.2,750.56c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1900.94,735.69c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1927.12,720.58c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1952.96,705.66c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM1979.27,690.47c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2005.42,675.38c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2031.16,660.51c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2057.34,645.4c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2083.18,630.48c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2109.49,615.29c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2135.23,600.43c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2161.41,585.31c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2187.25,570.39c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2213.56,555.21c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2239.7,540.11c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2265.45,525.25c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2291.62,510.13c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2317.47,495.21c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2343.77,480.03c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2369.52,465.16c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29ZM2395.7,450.05c-1.82,0-3.29-1.47-3.29-3.29s1.47-3.29,3.29-3.29,3.29,1.47,3.29,3.29-1.47,3.29-3.29,3.29Z"
                    />
                    <polygon
                        className="accent-color"
                        points="2400.67 524.94 1716.41 920 1998.48 920 2400.67 687.8 2400.67 524.94"
                    />
                    <path
                        className="primary-shade-6"
                        d="M1852.37,268.62c-18.41-31.89-57.69-44.18-90.63-29.66l-418.58,241.67c-32.29,20.37-42.99,62.78-23.74,96.13,17.27,29.92,52.9,42.58,84.44,32.05.14-.05.28-.1.42-.15,1.94-.66,3.87-1.4,5.77-2.24l418.58-241.67c2.59-1.63,5.03-3.42,7.34-5.33.13-.1.25-.21.38-.31,26.16-21.85,33.65-59.96,16.02-90.49ZM1673.59,398.15c-15.5,0-28.06-12.56-28.06-28.06s12.56-28.06,28.06-28.06,28.06,12.56,28.06,28.06-12.56,28.06-28.06,28.06ZM1743.63,345.13c-8.5,0-15.38-6.89-15.38-15.38s6.89-15.38,15.38-15.38,15.38,6.89,15.38,15.38-6.89,15.38-15.38,15.38ZM1795.19,309.61c-4.54,0-8.22-3.68-8.22-8.22s3.68-8.22,8.22-8.22,8.22,3.68,8.22,8.22-3.68,8.22-8.22,8.22Z"
                    />
                    <circle
                        className="primary-shade-12"
                        cx="1673.59"
                        cy="370.09"
                        r="28.06"
                        transform="translate(691.21 1774.66) rotate(-67.5)"
                    />
                    <circle className="primary-shade-12" cx="1743.63" cy="329.75" r="15.38" />
                    <circle
                        className="primary-shade-12"
                        cx="1795.19"
                        cy="301.39"
                        r="8.22"
                        transform="translate(-21.22 420.51) rotate(-13.28)"
                    />
                    <path
                        className="primary-shade-12"
                        d="M1190.24,691.18c0-39.67-32.16-71.82-71.82-71.82s-71.82,32.16-71.82,71.82,32.16,71.82,71.82,71.82c10.57,0,20.59-2.3,29.63-6.4,4.28-1.94,8.34-4.29,12.12-7,18.2-13.03,30.08-34.33,30.08-58.43Z"
                    />
                    <circle
                        className="accent-color"
                        cx="594.41"
                        cy="339.06"
                        r="28.06"
                        transform="translate(53.69 758.47) rotate(-67.5)"
                    />
                    <circle className="accent-color" cx="664.45" cy="298.71" r="15.38" />
                    <circle
                        className="accent-color"
                        cx="716.02"
                        cy="270.36"
                        r="8.22"
                        transform="translate(-42.96 171.74) rotate(-13.28)"
                    />
                    <path
                        className="accent-color"
                        d="M1718.68,834.34c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1692.83,849.26c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1666.65,864.37c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1640.91,879.24c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1875.2,743.97c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1848.89,759.16c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="accent-color" cx="1823.05" cy="777.37" r="3.29" />
                    <circle className="accent-color" cx="1796.87" cy="792.49" r="3.29" />
                    <circle className="accent-color" cx="1771.13" cy="807.35" r="3.29" />
                    <circle className="accent-color" cx="1744.98" cy="822.44" r="3.29" />
                    <path
                        className="primary-shade-12"
                        d="M529.76,132.77c32.11-20.42,42.71-62.72,23.5-95.99-17.67-30.61-54.58-43.18-86.64-31.3l-7.96,4.6L0,274.88v163.74L458.65,173.82l71.11-41.05Z"
                    />
                    <path
                        className="primary-shade-6"
                        d="M464.97,6.39c3.05-1.94,5.9-4.08,8.56-6.39H200.22L0,115.6v159.24L458.65,10.04l6.32-3.65Z"
                    />
                    <polygon className="accent-color" points="0 0 0 115.6 200.22 0 0 0" />
                    <polygon className="primary-shade-6" points="2282.1 920 2400.67 920 2400.67 851.54 2282.1 920" />
                    <polygon
                        className="primary-shade-12"
                        points="2400.67 687.8 1998.48 920 2253.57 920 2282.1 920 2400.67 851.54 2400.67 687.8"
                    />
                    <path
                        className="accent-color"
                        d="M1952.96,699.07c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="accent-color" cx="1927.12" cy="717.29" r="3.29" />
                    <path
                        className="accent-color"
                        d="M1900.94,729.11c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2083.18,623.89c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2057.34,638.81c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2031.16,653.93c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2005.42,668.79c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M1979.27,683.88c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2187.25,563.8c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2161.41,578.73c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2135.23,593.84c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="accent-color" cx="2109.49" cy="612" r="3.29" />
                    <circle className="accent-color" cx="2343.77" cy="476.73" r="3.29" />
                    <path
                        className="accent-color"
                        d="M2317.47,488.62c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2291.62,503.55c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="accent-color"
                        d="M2265.45,518.66c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="accent-color" cx="2239.7" cy="536.82" r="3.29" />
                    <path
                        className="accent-color"
                        d="M2213.56,548.62c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="accent-color" cx="2395.7" cy="446.75" r="3.29" />
                    <path
                        className="accent-color"
                        d="M2369.52,458.57c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="primary-shade-4" cx="496.84" cy="887.99" r="3.29" />
                    <path
                        className="primary-shade-4"
                        d="M470.99,899.62c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M653.36,794.33c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="primary-shade-4" cx="627.06" cy="812.81" r="3.29" />
                    <path
                        className="primary-shade-4"
                        d="M601.21,824.44c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M575.03,839.55c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M549.29,854.42c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="primary-shade-4" cx="523.14" cy="872.81" r="3.29" />
                    <path
                        className="primary-shade-4"
                        d="M757.27,734.34c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="primary-shade-4" cx="731.43" cy="752.55" r="3.29" />
                    <path
                        className="primary-shade-4"
                        d="M705.25,764.37c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M679.51,779.24c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M913.79,650.56c1.82,0,3.29-1.47,3.29-3.29s-1.47-3.29-3.29-3.29-3.29,1.47-3.29,3.29,1.47,3.29,3.29,3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M887.49,665.75c1.82,0,3.29-1.47,3.29-3.29s-1.47-3.29-3.29-3.29-3.29,1.47-3.29,3.29,1.47,3.29,3.29,3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M861.65,674.08c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M835.47,689.19c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <path
                        className="primary-shade-4"
                        d="M809.72,704.06c-1.82,0-3.29,1.47-3.29,3.29s1.47,3.29,3.29,3.29,3.29-1.47,3.29-3.29-1.47-3.29-3.29-3.29Z"
                    />
                    <circle className="primary-shade-4" cx="783.58" cy="722.45" r="3.29" />
                    <path
                        className="primary-shade-4"
                        d="M444.69,914.81c-1.82,0-3.29,1.47-3.29,3.29,0,.71.23,1.36.61,1.9h5.37c.38-.54.61-1.19.61-1.9,0-1.82-1.47-3.29-3.29-3.29Z"
                    />
                </svg>
                <div className="absolute top-0 left-0 bottom-0 right-0">{children}</div>
            </div>
        </>
    );
};

export default BackgroundArt;
