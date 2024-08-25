/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { FunctionalComponentWithChildrenProps } from "../types";

const combineProviders = (
    ...components: FunctionalComponentWithChildrenProps[]
): FunctionalComponentWithChildrenProps => {
    return components.reduce<FunctionalComponentWithChildrenProps>(
        (
            AccumulatedComponents: FunctionalComponentWithChildrenProps,
            CurrentComponent: FunctionalComponentWithChildrenProps,
        ) => {
            // eslint-disable-next-line react/display-name
            return ({ children }: { children: ReactNode }): ReactNode => {
                return (
                    <AccumulatedComponents>
                        <CurrentComponent>{children}</CurrentComponent>
                    </AccumulatedComponents>
                );
            };
        },
        ({ children }: { children: ReactNode }): ReactNode => <>{children}</>,
    );
};

export default combineProviders;
