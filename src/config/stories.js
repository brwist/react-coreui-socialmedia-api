import bestIcon from '../assets/best.png';
import newIcon from '../assets/new.png';
import seasonalIcon from '../assets/seasonal.png';
import findIcon from '../assets/find.png';
import brandIcon from '../assets/brand.png';
import shortsImg from '../assets/shorts.png';
import workoutImg from '../assets/workout.png';
import shirtImg from '../assets/shirt.png';
import crewImg from '../assets/crew.png';
import suitingImg from '../assets/suiting.png';
import henleyImg from '../assets/henley.png';

const colors = [
  {
    title: 'Blue',
    color: '#1773BC',
    children: [
      {
        title: 'Blue 101',
        color: '#5080E4'
      },
      {
        title: 'Blue 102',
        color: '#7383A6'
      },
      {
        title: 'Blue 103',
        color: '#344875'
      },
      {
        title: 'Blue 104',
        color: '#2147B4'
      },
      {
        title: 'Blue 105',
        color: '#67CAFF'
      },
      {
        title: 'Blue 106',
        color: '#1773BC'
      },
    ]
  },
  {
    title: 'Gray',
    color: '#949494'
  },
  {
    title: 'White',
    color: '#fff'
  },
  {
    title: 'Red',
    color: '#CB5656'
  }
]

export default [
  {
    title: 'Brand Stories',
    icon: brandIcon,
    children: [
      {
        title: 'Henley Top',
        icon: henleyImg,
        colors
      },
      {
        title: 'All Day Suiting',
        icon: suitingImg,
      },
      {
        title: 'Crew Necks',
        icon: crewImg,
        colors
      },
      {
        title: '5 Year Shirt',
        icon: shirtImg,
        colors,
      },
      {
        title: 'Workout Pants',
        icon: workoutImg,
        colors
      },
      {
        title: 'Running Shorts',
        icon: shortsImg,
        colors
      },
    ]
  },
  {
    title: 'Best Sellers',
    icon: bestIcon,
    children: [
      {
        title: 'All Day Suiting',
        icon: suitingImg,
      },
      {
        title: 'Henley Top',
        icon: henleyImg,
        colors
      },
      {
        title: 'Crew Necks',
        icon: crewImg,
        colors
      },
      {
        title: '5 Year Shirt',
        icon: shirtImg,
        colors
      },
      {
        title: 'Running Shorts',
        icon: shortsImg,
        colors
      },
      {
        title: 'Workout Pants',
        icon: workoutImg,
        colors
      },
    ]
  },
  {
    title: 'New Arrivals',
    icon: newIcon,
    children: [
      {
        title: 'Running Shorts',
        icon: shortsImg,
        colors
      },
      {
        title: 'Henley Top',
        icon: henleyImg,
        colors
      },
      {
        title: 'Crew Necks',
        icon: crewImg,
        colors
      },
      {
        title: '5 Year Shirt',
        icon: shirtImg,
        colors
      },
      {
        title: 'Workout Pants',
        icon: workoutImg,
        colors
      },
      {
        title: 'All Day Suiting',
        icon: suitingImg
      },
    ]
  },
  {
    title: 'Find Your Fit',
    icon: findIcon,
    children: [
      {
        title: 'All Day Suiting',
        icon: suitingImg
      },
      {
        title: 'Workout Pants',
        icon: workoutImg,
        colors
      },
      {
        title: 'Crew Necks',
        icon: crewImg,
        colors
      },
      {
        title: '5 Year Shirt',
        icon: shirtImg,
        colors
      },
      {
        title: 'Running Shorts',
        icon: shortsImg,
        colors
      },
      {
        title: 'Henley Top',
        icon: henleyImg,
        colors
      },
    ]
  },
  {
    title: 'Seasonal Looks',
    icon: seasonalIcon,
    children: [
      {
        title: 'Crew Necks',
        icon: crewImg,
        colors
      },
      {
        title: 'Henley Top',
        icon: henleyImg,
        colors
      },
      {
        title: 'All Day Suiting',
        icon: suitingImg,
      },
      {
        title: '5 Year Shirt',
        icon: shirtImg,
        colors
      },
      {
        title: 'Running Shorts',
        icon: shortsImg,
        colors
      },
      {
        title: 'Workout Pants',
        icon: workoutImg,
        colors
      },
    ]
  },
]