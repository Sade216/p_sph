import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { useTheme } from "@/components/ui/theme-provider";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type theme = 'dark' | 'light' | 'system';

function ThemeToggleButton() {
    const { setTheme, theme } = useTheme();
    const [themeState, setThemeState] = useState<theme>(theme)

    function handleThemeChange(e: boolean) {
        const selectedTheme = e;
        if (selectedTheme) {
            setThemeState("dark")
            setTheme("dark");
        } else {
            setThemeState("light")
            setTheme("light");
        }
    }

    useEffect(()=>{
        setThemeState(theme)
    },[theme])

    return (
        <div>
            <div className="pl-2 flex items-center gap-2">
                <Switch
                    id="theme_state"
                    className="cursor-pointer"
                    defaultChecked={themeState === 'light' ? false : true}
                    onCheckedChange={(e) => handleThemeChange(e)}
                />
                <Label htmlFor="airplane-mode" className="scale-80">{themeState === "light" ? <Sun /> : <Moon />}</Label>
            </div>
        </div>
    );
}

export default ThemeToggleButton;
