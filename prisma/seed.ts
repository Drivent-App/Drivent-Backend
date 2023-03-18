import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { userInfo } from 'os';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'testuser@test.com',
        password: 'testuserpassword',
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Presencial',
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
    });
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
    });
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Presencial com Hotel',
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    });
  }

  let hotels = await prisma.hotel.findFirst();
  if (!hotels) {
    hotels = await prisma.hotel.create({
      data: {
        name: 'Hotel California',
        image:
          'https://imagenes.elpais.com/resizer/HWIMbHAaBcu5VQv83rLr0pKsVIw=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/N72AADPVEHMDZTMWJK3D6HDTZ4.jpg',
      },
    });
    hotels = await prisma.hotel.create({
      data: {
        name: 'O Grande Hotel Budapeste',
        image:
          'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/6BB8E1DC494D04518BDB4DE0947B1CBC8D422508AF8D6A23C126BFBC661B8565/scale?width=1200&aspectRatio=1.78&format=jpeg',
      },
    });
  }

  let rooms = await prisma.room.findFirst();
  if (!rooms) {
    await prisma.room.createMany({
      data: [
        {
          name: '101',
          capacity: 1,
          hotelId: 1,
        },
        {
          name: '102',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: '103',
          capacity: 3,
          hotelId: 1,
        },
      ],
    });
    await prisma.room.createMany({
      data: [
        {
          name: '101',
          capacity: 1,
          hotelId: 2,
        },
        {
          name: '102',
          capacity: 2,
          hotelId: 2,
        },
        {
          name: '103',
          capacity: 3,
          hotelId: 2,
        },
      ],
    });
  }

  let bookings = await prisma.booking.findFirst();
  if (!bookings) {
    await prisma.booking.createMany({
      data: [
        {
          userId: user.id,
          roomId: 2,
        },
        {
          userId: user.id,
          roomId: 2,
        },
        {
          userId: user.id,
          roomId: 3,
        },
      ],
    });
  }
  let activities = await prisma.activities.findFirst();
  if (!activities) {
    await prisma.activities.createMany({
      data: [
        {
          lectureName: 'Como falar em publico',
          day: '2023-08-21T03:00:00.000Z',
          timeStart: '2023-08-20T12:00:00.000Z',
          timeEnd: '2023-08-20T13:00:00.000Z',
          numberVacancies: 30,
          local: 'Auditório Principal',
        },
        {
          lectureName: 'Como ficar rico',
          day: '2023-08-21T03:00:00.000Z',
          timeStart: '2023-08-21T11:00:00.000Z',
          timeEnd: '2023-08-21T15:00:00.000Z',
          numberVacancies: 3,
          local: 'Auditório Lateral',
        },
        {
          lectureName: 'Crise existencial',
          day: '2023-08-21T03:00:00.000Z',
          timeStart: '2023-08-21T16:00:00.000Z',
          timeEnd: '2023-08-21T17:00:00.000Z',
          numberVacancies: 15,
          local: 'Sala de Workshop',
        },

        {
          lectureName: 'Como virar dev',
          day: '2023-08-22T03:00:00.000Z',
          timeStart: '2023-08-22T10:00:00.000Z',
          timeEnd: '2023-08-22T12:00:00.000Z',
          numberVacancies: 25,
          local: 'Auditório Principal',
        },
        {
          lectureName: 'Eu e meu clone',
          day: '2023-08-22T03:00:00.000Z',
          timeStart: '2023-08-22T08:00:00.000Z',
          timeEnd: '2023-08-22T10:00:00.000Z',
          numberVacancies: 1,
          local: 'Auditório Lateral',
        },
        {
          lectureName: 'Crise existencial 2',
          day: '2023-08-22T03:00:00.000Z',
          timeStart: '2023-08-23T16:30:00.000Z',
          timeEnd: '2023-08-23T17:00:00.000Z',
          numberVacancies: 20,
          local: 'Sala de Workshop',
        },

        {
          lectureName: 'Como cozinhar ovo',
          day: '2023-08-23T03:00:00.000Z',
          timeStart: '2023-08-23T12:00:00.000Z',
          timeEnd: '2023-08-23T13:00:00.000Z',
          numberVacancies: 30,
          local: 'Auditório Principal',
        },
        {
          lectureName: 'Como não ficar pobre',
          day: '2023-08-23T03:00:00.000Z',
          timeStart: '2023-08-23T10:00:00.000Z',
          timeEnd: '2023-08-23T12:00:00.000Z',
          numberVacancies: 10,
          local: 'Auditório Lateral',
        },
        {
          lectureName: 'Como fazer miojo',
          day: '2023-08-23T03:00:00.000Z',
          timeStart: '2023-08-23T16:30:00.000Z',
          timeEnd: '2023-08-23T17:00:00.000Z',
          numberVacancies: 15,
          local: 'Sala de Workshop',
        },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
