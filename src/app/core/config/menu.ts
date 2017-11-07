import { Injectable  } from '@angular/core';

@Injectable()
export class Menu {
  menuList = [
    { 
      key: 'home',
      icon: 'home.png',
      href: '/',
      visability: '/',
    },
    { 
      key: 'quiz',
      icon: 'quiz.png',
      href: '/quiz',
      visability: '/quiz',
    },
    { 
      key: 'admin',
      icon: 'admin.png',
      href: '/logout',
      visability: '/logout',
    },
  ];

  subMenuList = {
    home: [
      {
        href: '/login',
        key: 'login',
      },
      {
        href: '/logout',
        key: 'logout',
      }
    ],
    quiz: [
      {
        href: '/quiz/take',
        key: 'take',
      },
      {
        href: '/quiz/results',
        key: 'results',
      },
      {
        href: '/quiz/make',
        key: 'make',
      }
    ],
    admin: [
    ]
  };
}
