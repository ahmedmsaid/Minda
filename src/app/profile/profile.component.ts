import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  info = [
    {
      image: '../../assets/img/add.jpg',
      name:'OLa Yasser',
      jop:'student',
      school:'jdjdjjdjddd',
      country:'egypt',
      phone:'0106553343',
      bio:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      courseenrolled: [
        {
        name: 'Information Retrieval',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        time: '10h' ,
        level: 'high'
        },
      ],
      coursecompleted: [
        {
          name: 'AI',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          time: '1h' ,
          level: 'high'
        },
      ],
      badgets: [
        {
          image: '',
          title: ' ',
        },
      ],
    },
  ];
}
