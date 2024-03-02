import moment from 'moment'

// NAME OF FARMS
export const farms = [
    {
        id: 1,
        title: 'Mercado QP Farm'
    },
    {
        id: 2,
        title: 'Acunin QP Farm'
    },
    {
        id: 3,
        title: 'Lester QP Farm'
    },
    {
        id: 4,
        title: 'Mercado QP Farm'
    },
    {
        id: 5,
        title: 'Acunin QP Farm'
    },
    {
        id: 6,
        title: 'Lester QP Farm'
    },
    {
        id: 7,
        title: 'Acunin QP Farm'
    },
    {
        id: 8,
        title: 'Lester QP Farm'
    }
]

// SCHEDULE OF FARMS
export const events = [
    {
      id: 1, // document id
      group: 1, // uid
      title: 'Vegetation',
      className: 'vegetation',
      start_time: moment().add(-11, 'month'),
      end_time: moment().add(-1, 'month')
    },
    {
        id: 2,
        group: 1,
        title: 'Flowering',
        className: 'flowering',
        start_time: moment().add(-1, 'month'),
        end_time: moment().add(1, 'month')
    },
    {
        id: 5,
        group: 1,
        title: 'Fruiting',
        className: 'fruiting',
        start_time: moment().add(1, 'month'),
        end_time: moment().add(6, 'month')
    },
    {
      id: 3,
      group: 2,
      title: 'Vegetation',
      className: 'vegetation',
      start_time: moment().add(-28, 'month'),
      end_time: moment().add(-18, 'month')
    },
    {
        id: 4,
        group: 2,
        title: 'Flowering',
        className: 'flowering',
        start_time: moment().add(-18, 'month'),
        end_time: moment().add(-16, 'month')
      },
      {
        id: 6,
        group: 2,
        title: 'Fruiting',
        className: 'fruiting',
        start_time: moment().add(-16, 'month'),
        end_time: moment().add(-11, 'month')
      },
    {
        id: 7,
        group: 3,
        title: 'Vegetation',
        className: 'vegetation',
        start_time: moment().add(1, 'month'),
        end_time: moment().add(10, 'month')
      },
      {
        id: 8,
        group: 3,
        title: 'Flowering',
        className: 'flowering',
        start_time: moment().add(10, 'month'),
        end_time: moment().add(12, 'month')
      },
      {
        id: 9,
        group: 3,
        title: 'Fruiting',
        className: 'fruiting',
        start_time: moment().add(12, 'month'),
        end_time: moment().add(18, 'month')
      },
      {
        id: 11, // document id
        group: 4, // uid
        title: 'Vegetation',
        className: 'vegetation',
        start_time: moment().add(-11, 'month'),
        end_time: moment().add(-1, 'month')
      },
      {
          id: 12,
          group: 5,
          title: 'Flowering',
          className: 'flowering',
          start_time: moment().add(-1, 'month'),
          end_time: moment().add(1, 'month')
      },
      {
          id: 10,
          group: 6,
          title: 'Fruiting',
          className: 'fruiting',
          start_time: moment().add(1, 'month'),
          end_time: moment().add(6, 'month')
      },
      {
        id: 14,
        group: 7,
        title: 'Flowering',
        className: 'flowering',
        start_time: moment().add(-1, 'month'),
        end_time: moment().add(1, 'month')
    },
    {
        id: 13,
        group: 8,
        title: 'Fruiting',
        className: 'fruiting',
        start_time: moment().add(1, 'month'),
        end_time: moment().add(6, 'month')
    },
  ]

// TOTAL NG GASTOS
export const gastosSaPinya = {
    title: "Gastos sa Pinya",
    labelOne: "P87, 800 (Gastos)",
    labelTwo: "Kabuuan na Gastos",
    data: [
        {
        name: "Materyales", y: 55
        },
        {
        name: "Paggawa", y: 45
        }
    ]
}

// BENTA SA PINYA
export const bentaSaPinya = {
    title: "Benta sa Pinya",
    labelOne: "P166, 250 (Kita)",
    labelTwo: "Kabuuan na kita",
    data: [
        {
        name: "Pinya", y: 100
        },
    ]
}

// FARM ONE
export const farmOne = [
    {
        id: 1,
        title: "Pagtatanim"
    },
    {
        id: 2,
        title: "Lumalaki"
    },
    {
        id: 3,
        title: "Namumulaklak"
    },
    {
        id: 4,
        title: "Nagbubunga"
    },
    {
        id: 5,
        title: "Pagaani"
    }
]

export const eventFarmOne = [
    {
        id: 1,
        group: 1,
        start_time: moment().add(-18, 'month'),
        end_time: moment().add(-17, 'month')
    },
    {
        id: 2,
        group: 2,
        start_time: moment().add(-17, 'month'),
        end_time: moment().add(-9, 'month')
    },
    {
        id: 3,
        group: 3,
        start_time: moment().add(-9, 'month'),
        end_time: moment().add(-7, 'month')
    },
    {
        id: 4,
        group: 4,
        start_time: moment().add(-7, 'month'),
        end_time: moment().add(-3, 'month')
    },
    {
        id: 5,
        group: 5,
        start_time: moment().add(-3, 'month'),
        end_time: moment()
    },
]