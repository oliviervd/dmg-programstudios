export function getObjects(client) {
    return client
        .from("dmg_objects_LDES")
        .select("color_names, HEX_values, iiif_image_uris, objectNumber, LDES_raw",  {'head':false})
        .not("color_names", 'is', null)
    return Promise.resolve([])
}

export function getThesaurus(client) {
    return client
        .from("dmg_thesaurus_LDES")
        .select("*",  {'head':false})
    return Promise.resolve([])
}

export function getAgents(client) {
    return client
        .from("dmg_personen_LDES")
        .select("*",  {'head':false})
    return Promise.resolve([])
}