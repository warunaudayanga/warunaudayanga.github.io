import { JSX, useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { stackIcon } from "../../data/stack-icons.ts";
import { StackIcon } from "./index.ts";
import { ScrollPane } from "../layout";
import { BiX } from "react-icons/bi";
import { Tool } from "../../interfaces";
import { useClickOutside } from "../../hooks";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    title?: string;
    required?: boolean;
    className?: string;
    fullWidth?: boolean;
    value?: (keyof typeof stackIcon)[] | null;
}

interface ControlTool extends Tool {
    selected: boolean;
    filtered?: boolean;
}

const ToolSelector = ({ title, name, control, required, fullWidth, value, className }: Props): JSX.Element => {
    const [panelOpened, setPanelOpened] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);

    const [availableTools, setAvailableTools] = useState<ControlTool[]>(
        (Object.entries(stackIcon) as [keyof typeof stackIcon, keyof typeof stackIcon][])
            .map(([name, icon]) => ({ name, icon, selected: Boolean(value?.includes(name)) }))
            .sort((a, b) => a.name.localeCompare(b.name)),
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const changeFilteredToolState = (keyword: string): ControlTool[] => {
        return availableTools.map(tool => {
            tool.filtered = tool.name.toLowerCase().includes(keyword.toLowerCase());
            return tool;
        });
    };

    useClickOutside(panelRef, (): void => {
        setPanelOpened(false);
        setFocused(false);
    });

    useEffect(() => {
        setAvailableTools(changeFilteredToolState(keyword));
    }, [keyword, availableTools.length]);

    return (
        <div className={twMerge(className, "inline-block p-3", fullWidth ? "w-full" : "")}>
            {title && <div className="font-bold mb-2">{title}</div>}
            <Controller
                control={control}
                name={name}
                rules={{ required: required ? `${title} is required.` : undefined }}
                render={({ field, fieldState }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        const tools = availableTools.map(tool => ({
                            ...tool,
                            selected: (field.value as string[]).includes(tool.name),
                        }));

                        setAvailableTools(tools);
                    }, [field.value]);

                    const changeSelectedToolState = (name: string): ControlTool[] => {
                        return availableTools.map(tool => {
                            if (tool.name === name) tool.selected = !tool.selected;
                            return tool;
                        });
                    };

                    const onChange = (name: string): void => {
                        const tools = changeSelectedToolState(name);

                        setAvailableTools(tools);

                        const selected = tools.filter(tool => tool.selected);
                        field.onChange({
                            target: {
                                value: selected.length ? selected.map(tool => tool.name) : [],
                            },
                        });

                        inputRef.current!.value = "";
                        inputRef.current!.focus();
                        setKeyword("");
                    };

                    return (
                        <>
                            <div
                                ref={panelRef}
                                id={name}
                                className="tool-selector w-full"
                                onClick={() => {
                                    setPanelOpened(true);
                                    setFocused(true);
                                }}
                            >
                                <div
                                    className={twMerge(
                                        "border rounded w-full py-2 px-3 inline-flex flex-wrap gap-2 items-center",
                                        fieldState.invalid
                                            ? `border-danger ${focused ? "shadow-danger border-danger" : ""}`
                                            : focused
                                              ? "shadow-secondary border-secondary"
                                              : "",
                                    )}
                                >
                                    {availableTools
                                        .filter(({ selected }) => selected)
                                        .map(({ name, icon }) => (
                                            <div
                                                key={name}
                                                className="inline-flex items-center gap-2 bg-accent px-2 py-1 rounded-lg"
                                            >
                                                <StackIcon key={name} icon={icon || stackIcon.NoIcon} size="20px" />
                                                {name}
                                                <button type="button" onClick={() => onChange(name)}>
                                                    <BiX className="pointer-events-none" />
                                                </button>
                                            </div>
                                        ))}
                                    <div className="relative inline-block">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            name={field.name}
                                            className="outline-0"
                                            onChange={e => setKeyword(e.target.value)}
                                            onFocus={() => {
                                                setFocused(true);
                                                setPanelOpened(true);
                                            }}
                                            onBlur={() => {
                                                field.onBlur();
                                            }}
                                            disabled={field.disabled}
                                        />
                                        {panelOpened && (
                                            <div className="absolute z-[1000] border rounded top-full left-0 py-2 bg-white shadow w-[175px]">
                                                <ScrollPane maxHeight="250px" full>
                                                    {availableTools.some(({ selected }) => !selected) ? (
                                                        availableTools.every(({ filtered }) => !filtered) ? (
                                                            <div className="text-center">No tools with filter</div>
                                                        ) : (
                                                            availableTools
                                                                .filter(({ filtered }) => filtered)
                                                                .map(({ name, icon, selected }) => (
                                                                    <div
                                                                        key={name}
                                                                        style={{ display: selected ? "none" : "flex" }}
                                                                        className="flex items-center gap-2 px-4 cursor-pointer my-2"
                                                                        onClick={() => onChange(name)}
                                                                    >
                                                                        <StackIcon
                                                                            icon={icon || stackIcon.NoIcon}
                                                                            size="20px"
                                                                        />
                                                                        {name}
                                                                    </div>
                                                                ))
                                                        )
                                                    ) : (
                                                        <div className="text-center">No other tools</div>
                                                    )}
                                                </ScrollPane>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {fieldState.error && <small className="text-danger">{fieldState.error.message}</small>}
                            </div>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ToolSelector;
