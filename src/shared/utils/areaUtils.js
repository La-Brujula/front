import areas from '@shared/constants/areas.json';

export function getTitle(userActivity, gender = 'Alias Genérico') {
    if (!userActivity) return
    try {
        return areas[getAreaFromId(userActivity)][getSubAreaFromId(userActivity)][userActivity][gender].es
    } catch (e) {
        console.error(getAreaFromId(userActivity), getSubAreaFromId(userActivity))
        return userActivity
    }
}

export function getArea(area) {
    try {
        return Object.keys(areas)[area - 1]
    } catch (e) {
        console.error(e)
        return area
    }
}

export function getSubArea(area, subareaIndex) {
    try {
        return Object.keys(areas[area])[subareaIndex - 1]
    } catch (e) {
        console.error(e)
        return subareaIndex
    }
}

export function getAreaFromId(activity) {
    try {
        return getArea(parseInt(activity.charAt(0)))
    } catch (e) {
        console.error(e)
        return activity
    }
}

export function getSubAreaFromId(activity) {
    try {
        return getSubArea(getAreaFromId(activity), parseInt(activity.split('-')[0].slice(1)))
    } catch (e) {
        console.error(e)
        return activity
    }
}