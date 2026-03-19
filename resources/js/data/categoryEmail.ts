export const categoryEmail = [
    {
        id: 'affiliation',
        title: 'Afiliaciones'
    },
    {
        id: 'volunteer_campaign',
        title: 'Voluntariado y Apoyo en Campaña',
    },
    {
        id: 'agenda_interviews',
        title: 'Invitaciones a Agenda / Entrevistas',
    },
    {
        id: 'corruption_reports',
        title: 'Denuncias de Corrupción / Irregularidades',
    },
    {
        id: 'citizen_proposals',
        title: 'Propuestas Ciudadanas / Ideas de Políticas Públicas',
    },
    {
        id: 'press_media',
        title: 'Prensa y Medios de Comunicación',
    },
    {
        id: 'others',
        title: 'Otros',
    }
] as const;

export type CategoryEmail = typeof categoryEmail[number];
