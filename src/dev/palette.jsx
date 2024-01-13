import React from "react"
import MUIPalette from "@react-buddy/palette-mui";
import {
    Variant,
    Palette,
    Category,
    Component,
} from "@react-buddy/ide-toolbox"

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <MUIPalette/>
    </Palette>
)

export function ExampleLoaderComponent() {
    return (
        <>Loading...</>
    )
}