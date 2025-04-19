class StyleRead {
    static getStyleLeft(object) {
        return (Number)((String)(getComputedStyle(object).getPropertyValue('left')).slice(0, -2));
    }
    static getStyleRight(object) {
        return (Number)((String)(getComputedStyle(object).getPropertyValue('right')).slice(0, -2));
    }
    static getStyleTop(object) {
        return (Number)((String)(getComputedStyle(object).getPropertyValue('top')).slice(0, -2));
    }
    static getStyleBottom(object) {
        return (Number)((String)(getComputedStyle(object).getPropertyValue('bottom')).slice(0, -2));
    }
    static getStyleWidth(object) {
        return (Number)((String)(getComputedStyle(object).getPropertyValue('width')).slice(0, -2));
    }
}