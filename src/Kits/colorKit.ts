import chroma from 'chroma-js';

export const IvicosColors = {
    Blau: '#00A1DE',
    Schwarz: '#201f1e',
    Dunkelblau: '#172d4d',
    // neutralQuaternary
    Grau100: '#C9CAC8',
    Grau75: '#d7d7d6',
    Grau50: '#e4e4e3',
    // neutralLighterAlt
    Grau25: '#f1f2f1',
    Campusorange: '#FFA02F',
    Spacegrün: '#8BA69C',
    Strategyblau: '#55788d',
    Petrol: '#004d67',
    Mittelblau: '#39689c',
    CampusGradient: 'linear-gradient(45deg, #172D4D 0%, #00A1DE 100%)'
};

// export default IvicosColors;

export const getTextColorForBackground = (background: string): any => {
    if (!background) return '#000';
    if (background.includes('gradient')) return '#fff';

    try {
        const bgColorLightness = chroma(background).hsl()[2];
        return bgColorLightness >= 0.5 ? '#000' : '#fff';
    } catch (err) {
        return '#000';
    }
};
