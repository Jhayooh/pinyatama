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
    }
]

// SCHEDULE OF FARMS
export const events = [
    {
      id: 1,
      group: 1,
      title: 'namumulaklak',
      className: 'namumulaklak',
      start_time: moment().add(-11, 'month'),
      end_time: moment().add(6, 'month')
    },
    {
        id: 2,
        group: 1,
        title: 'pagtatanim',
        className: 'pagtatanim',
        start_time: moment().add(-12, 'month'),
        end_time: moment().add(-11, 'month')
    },
    {
      id: 3,
      group: 2,
      title: 'nagbubunga',
      className: 'nagbubunga',
      start_time: moment().add(-9, 'month'),
      end_time: moment().add(9, 'month')
    },
    {
        id: 4,
        group: 3,
        title: 'pagtatanim',
        className: 'pagtatanim',
        start_time: moment().add(-7, 'month'),
        end_time: moment().add(11, 'month')
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