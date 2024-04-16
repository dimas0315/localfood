import _ from "lodash";

export const SYMBOL_SCALE = 1;
export const COLLISION_RADIUS = 7.5;
export const SYMBOL_STROKE_COLOR = "#000";
export const SYMBOL_STROKE_WIDTH = "1";
export const CHART_MARGIN = 10;


export function nl360(a: number): number {
    return (a + 360) % 360;
}
export function nl180(a: number): number {
    return nl360(a) % 180;
}

export const SYMBOL_PLANET = {
    Sun: "Sun",
    Moon: "Moon",
    Mercury: "Mercury",
    Venus: "Venus",
    Mars: "Mars",
    Jupiter: "Jupiter",
    Saturn: "Saturn",
    Uranus: "Uranus",
    Neptune: "Neptune",
    Pluto: "Pluto",
    Chiron: "Chiron",
    Lilith: "Lilith",
    NorthNode: "NorthNode",
    SouthNode: "SouthNode",
    ParsFortuna: "ParsFortuna"
};
export const SYMBOL_ZODIAC = {
    Aries: "Aries",
    Taurus: "Taurus",
    Gemini: "Gemini",
    Cancer: "Cancer",
    Leo: "Leo",
    Virgo: "Virgo",
    Libra: "Libra",
    Scorpio: "Scorpio",
    Sagittarius: "Sagittarius",
    Capricorn: "Capricorn",
    Aquarius: "Aquarius",
    Pisces: "Pisces"
};
export const SYMBOL_HOUSE = {
    Ascendant: "Ascendant",
    Descendant: "Descendant",
    MediumCoeli: "MediumCoeli",
    ImmumCoeli: "ImmumCoeli"
}
export const SYMBOL_CUSP = {
    Cusp1: "Cusp1",
    Cusp2: "Cusp2",
    Cusp3: "Cusp3",
    Cusp4: "Cusp4",
    Cusp5: "Cusp5",
    Cusp6: "Cusp6",
    Cusp7: "Cusp7",
    Cusp8: "Cusp8",
    Cusp9: "Cusp9",
    Cusp10: "Cusp10",
    Cusp11: "Cusp11",
    Cusp12: "Cusp12"
}
export const SYMBOL_ASPECT = {
    Conjunction: "Conjunction",
    Opposition: "Opposition",
    Trine: "Trine",
    Square: "Square",
    Sextile: "Sextile",
    Quincunx: "Quincunx",
    Sesquisquare: "Sesquisquare",
    Semisquare: "Semisquare",    
    Semisextile: "Semisextile",
    Quintile: "Quintile",
    Biquintile: "Biquintile",

    // need symbols
    Nonile: "Nonile",
    Septagon: "Septagon",
    Binonile: "Binonile",
    Seminonile: "Seminonile",
    Sesquiquintile: "Sesquiquintile",
    Semiquintile: "Semiquintile",
    Septile: "Septile",
    Biseptile: "Biseptile",
    Triseptile: "Triseptile"
}
export const ZodiacSymbols: string[] = ['♈', "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", '♑', "♒", "♓"];
export const ZodiacSigns: string[] = [
    SYMBOL_ZODIAC.Aries,
    SYMBOL_ZODIAC.Taurus,
    SYMBOL_ZODIAC.Gemini,
    SYMBOL_ZODIAC.Cancer,
    SYMBOL_ZODIAC.Leo,
    SYMBOL_ZODIAC.Virgo,
    SYMBOL_ZODIAC.Libra,
    SYMBOL_ZODIAC.Scorpio,
    SYMBOL_ZODIAC.Sagittarius,
    SYMBOL_ZODIAC.Capricorn,
    SYMBOL_ZODIAC.Aquarius,
    SYMBOL_ZODIAC.Pisces
];
export function pad2(n: number | string): string {
    return _.padStart(n + '', 2);
}
export function convert_DD_to_DMS(degrees: number, sign = "°"): string {
    var deg = degrees | 0;
    var frac = Math.abs(degrees - deg);
    var min = (frac * 60) | 0;
    var sec = Math.round(frac * 3600 - min * 60);
    return pad2(deg) + sign + pad2(min) + "'" + pad2(sec) + "\"";
}
export function convert_DD_to_D(degrees: number, sign = "°"): string {
    var deg = degrees | 0;
    var frac = Math.abs(degrees - deg);
    var dec = (frac * 10)|0;
    return `${deg}${dec!==0?'.'+dec:''}${sign}`;    
}
export function pos_in_zodiac_sign(longitude: number): number {
    return longitude % 30;
}
export function zodiac_sign(longitude: number): string {
    return ZodiacSigns[Math.floor(longitude / 30)];
}
export function zodiac_symbol(longitude: number): string {
    return ZodiacSymbols[Math.floor(longitude / 30)];
}
export function format_pos_in_zodiac(position: number, sign_as_symbol: boolean = true): string {
    const sign = sign_as_symbol ? zodiac_symbol(position) : ' ' + zodiac_sign(position) + ' ';
    return convert_DD_to_DMS(pos_in_zodiac_sign(position), sign);
}
export function pos_in_zodiac(position: number) : any {
    const z_pos = pos_in_zodiac_sign(position);
    var deg = z_pos | 0;
    var frac = Math.abs(z_pos - deg);
    var min = (frac * 60) | 0;
    var sec = Math.round(frac * 3600 - min * 60);
    return {
        position: position,
        deg,
        min,
        sec,
        deg_fmt: deg + "°",
        min_fmt: min + "'" ,
        sec_fmt: sec + "\"",
        sign: ZodiacSigns[Math.floor(position / 30)]
    };
}
export function aspect_color(angle: number): any {
    let options = {};
    switch (angle) {
        case 0:
            options = { stroke_color: "#804f14" };
            break;

        case 180:
        case 90:
            options = { stroke_color: "#bb0000" };
            break;
        case 45:
        case 135: 
            options = { stroke_color: "#bb0000", stroke_dasharray: "1,2" };
            break;
            
        case 120: 
        case 60:
            options = { stroke_color: "#009900" };
            break;
        case 150:
        case 30: 
            options = { stroke_color: "#009900", stroke_dasharray: "1,2" };
            break;


        case 144: 
        case 72: 
            options = { stroke_color: "#000099" };
            break;
        case 36:     
        case 108:
            options = { stroke_color: "#000099", stroke_dasharray: "1,2" };
            break;  

        case 80: 
        case 40: 
            options = { stroke_color: "#cc0099" };
            break;
        case 100:     
        case 20:
            options = { stroke_color: "#cc0099", stroke_dasharray: "1,2" };
            break;  


        case 102.8:            
        case 51.4:
            options = { stroke_color: "#eebb00"};
            break;
        case 154.2:            
            options = { stroke_color: "#eebb00", stroke_dasharray: "1,1"};
            break;
    }
    return options;    
}

//stroke_dasharray: "5,3"