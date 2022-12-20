import areas from '@shared/constants/areas.json';

export function getTitle(area, userSubarea, gender) {
    try {
        return Object.values(areas[getArea(area)])[parseInt(userSubarea.split('-')[0].slice(1) - 1)][userSubarea][gender].es
    } catch (e) {
        return userSubarea
    }
}

export function getArea(area) {
    try {
        return Object.keys(areas)[area - 1]
    } catch {
        return area
    }
}