import React, { Component } from 'react'

import { Gallery } from "react-grid-gallery";

const images = [
  {
    "id": "136",
    "author": "Marcin Czerwinski",
    "width": 4032,
    "height": 2272,
    "src": "https://unsplash.com/photos/2wugfiddtXw",
    "download_src": "https://picsum.photos/id/136/4032/2272"
},
{
    "id": "137",
    "author": "Vladimir Kramer",
    "width": 4752,
    "height": 3168,
    "src": "https://unsplash.com/photos/xzZtV9ED5Bs",
    "download_src": "https://picsum.photos/id/137/4752/3168"
},
{
    "id": "139",
    "author": "Steve Richey",
    "width": 3465,
    "height": 3008,
    "src": "https://unsplash.com/photos/M-1MRfncLk0",
    "download_src": "https://picsum.photos/id/139/3465/3008"
},
{
    "id": "140",
    "author": "Kundan Ramisetti",
    "width": 2448,
    "height": 2448,
    "src": "https://unsplash.com/photos/Acfgb7bc-Bc",
    "download_src": "https://picsum.photos/id/140/2448/2448"
},
{
    "id": "141",
    "author": "Greg Shield",
    "width": 2048,
    "height": 1365,
    "src": "https://unsplash.com/photos/v9eNihIWh8k",
    "download_src": "https://picsum.photos/id/141/2048/1365"
},
{
    "id": "142",
    "author": "Vadim Sherbakov",
    "width": 4272,
    "height": 2848,
    "src": "https://unsplash.com/photos/KSyemQIWwP8",
    "download_src": "https://picsum.photos/id/142/4272/2848"
},
{
    "id": "143",
    "author": "Steve Richey",
    "width": 3600,
    "height": 2385,
    "src": "https://unsplash.com/photos/6xqAK6oAeHA",
    "download_src": "https://picsum.photos/id/143/3600/2385"
},
{
    "id": "144",
    "author": "Mouly Kumar",
    "width": 4912,
    "height": 2760,
    "src": "https://unsplash.com/photos/TuOiIpkIea8",
    "download_src": "https://picsum.photos/id/144/4912/2760"
},
{
    "id": "145",
    "author": "Lucas Boesche",
    "width": 4288,
    "height": 2848,
    "src": "https://unsplash.com/photos/VkuuTRkcRqw",
    "download_src": "https://picsum.photos/id/145/4288/2848"
},
{
    "id": "146",
    "author": "Florian Klauer",
    "width": 5000,
    "height": 3333,
    "src": "https://unsplash.com/photos/GG0jOrmwqtw",
    "download_src": "https://picsum.photos/id/146/5000/3333"
},
];

export default class ImageGal extends Component {
  render() {
    return <Gallery images={images} />
  }
}
