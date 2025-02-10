import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      /*{
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      }, */
      {
        id: 5, // Agregar Inglés
        title: "English",
        imageSrc: "/en.svg", // Agregar el SVG de la bandera de EE.UU.
      },
      {
        id: 6, // Agregar Inglés
        title: "Portuguese",
        imageSrc: "/br.svg", // Agregar el SVG de la bandera de EE.UU.
      },
    ]);

    await db.insert(schema.units).values([
      /*{
        id: 1,
        courseId: 1, // Spanish
        title: "Unidad 1",
        description: "Learn the basics of Spanish",
        order: 1,
      }, */
      {
        id: 2, // Nuevo ID para Inglés
        courseId: 5, // CourseId 5 es para Inglés
        title: "Unidad 1",
        description: "Aprende los conceptos básicos del inglés",
        order: 1,
      },
      {
        id: 3,
        courseId: 6, // Portugués de Brasil
        title: "Unidad 1",
        description: "Aprenda o básico de Português",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      /* {
        id: 1,
        unitId: 1, 
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, 
        order: 5,
        title: "Verbs",
      },*/
      {
        id: 6,
        unitId: 2,
        order: 6,
        title: "Basic Greetings",
      },
      {
        id: 7,
        unitId: 2,
        order: 7,
        title: "Common Phrases",
      },
      {
        id: 8,
        unitId: 2,
        order: 8,
        title: "Numbers",
      },
      {
        id: 9,
        unitId: 3, 
        order: 1,
        title: "Saudações básicas",
      },
      {
        id: 10,
        unitId: 3,
        order: 3,
        title: "Frases Comuns",
      },
      { id: 11, unitId: 3, order:4, title: "Números en Portugués" }
      
    ]);

    await db.insert(schema.challenges).values([
     /* {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      }, 
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, 
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },*/
      {
        id: 7,
        lessonId: 6, 
        type: "SELECT",
        order: 1,
        question: 'Cuál de estos significa "Hola"',
      },
      {
        id: 8,
        lessonId: 6,
        type: "ASSIST",
        order: 2,
        question: '"Bienvenido"',
      },
      { id: 9, lessonId: 7, 
        type: "SELECT",
        order: 3,
        question: '¿Cuál de estos significa "Gracias"?',
      },
      { id: 10, lessonId: 9, type: "SELECT", order: 1, question: '¿Cuál de estas palabras significa "Hola" en Portugués?' },
      { id: 11, lessonId: 9, type: "ASSIST", order: 2, question: '"Adiós"' },
      { id: 12, lessonId: 9, type: "SELECT", order: 3, question: '¿Cuál de estas palabras significa "Buenas noches" en Portugués?' },

      { id: 13, lessonId: 10, type: "SELECT", order: 1, question: '¿Cuál de estas frases significa "Gracias" en Portugués?' },
      { id: 14, lessonId: 10, type: "SELECT", order: 2, question: '¿Cuál de estas frases significa "Por favor" en Portugués?' },

      { id: 15, lessonId: 11, type: "SELECT", order: 1, question: '¿Cuál es el número "uno" en Portugués?' },
      { id: 16, lessonId: 11, type: "SELECT", order: 2, question: '¿Cuál es el número "tres" en Portugués?' },

      { id: 17, lessonId: 8, type: "SELECT", order: 1, question: '¿Cuál es el número "uno" en Inglés?' },
      { id: 18, lessonId: 8, type: "SELECT", order: 2, question: '¿Cuál es el número "tres" en Inglés?' },
      
    ]);

    await db.insert(schema.challengeOptions).values([
     /* {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },*/
      {
        challengeId: 7, // Which one of these means "Hello"?
        imageSrc: "/hello.svg",
        correct: true,
        text: "Hello",
        audioSrc: "/en_hello.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/goodbye.svg",
        correct: false,
        text: "Goodbye",
        audioSrc: "/en_goodbye.mp3",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Goodbye",
        audioSrc: "/en_goodbye.mp3",
      },
      {
        challengeId: 8, // "Hello"
        correct: false,
        text: "Hello",
        audioSrc: "/en_hello.mp3",
      },
      {
        challengeId: 8, // "Hello"
        correct: true,
        text: "Welcome",
        audioSrc: "/en_hello.mp3",
      },
      {
        challengeId: 9, // "Thank you"
        correct: true,
        text: "Thank you",
        audioSrc: "/en_thanks.mp3",
      },
      {
        challengeId: 9, // "Thank you"
        correct: false,
        text: "Goodbye",
        audioSrc: "/en_thanks.mp3",
      },
      {
        challengeId: 9, // "Thank you"
        correct: false,
        text: "Hello",
        audioSrc: "/en_thanks.mp3",
      }
    ]);
    await db.insert(schema.challengeOptions).values([
      { challengeId: 10, imageSrc: "", correct: true, text: "Olá", audioSrc: "/br_hello.mp3" },
      { challengeId: 10, imageSrc: "", correct: false, text: "Adeus", audioSrc: "/br_goodbye.mp3" },
      { challengeId: 10, imageSrc: "", correct: false, text: "Obrigado", audioSrc: "/br_thanks.mp3" },

      { challengeId: 11, imageSrc: "", correct: true, text: "Adeus", audioSrc: "/br_goodbye.mp3" },
      { challengeId: 11, imageSrc: "", correct: false, text: "Olá", audioSrc: "/br_hello.mp3" },
      { challengeId: 11, imageSrc: "", correct: false, text: "Por favor", audioSrc: "/br_please.mp3" },

      { challengeId: 12, imageSrc: "", correct: false, text: "Adeus", audioSrc: "/br_goodbye.mp3" },
      { challengeId: 12, imageSrc: "", correct: false, text: "Olá", audioSrc: "/br_hello.mp3" },
      { challengeId: 12, imageSrc: "", correct: true, text: "Boa noite", audioSrc: "/br_please.mp3" },

      { challengeId: 13, imageSrc: "", correct: true, text: "Obrigado", audioSrc: "/br_thanks.mp3" },
      { challengeId: 13, imageSrc: "", correct: false, text: "Por favor", audioSrc: "/br_please.mp3" },
      { challengeId: 13, imageSrc: "", correct: false, text: "Olá", audioSrc: "/br_hello.mp3" },

      { challengeId: 14, imageSrc: "", correct: true, text: "Por favor", audioSrc: "/br_please.mp3" },
      { challengeId: 14, imageSrc: "", correct: false, text: "Obrigado", audioSrc: "/br_thanks.mp3" },
      { challengeId: 14, imageSrc: "", correct: false, text: "Olá", audioSrc: "/br_hello.mp3" },

      { challengeId: 15, imageSrc: "/one.svg", correct: true, text: "Um", audioSrc: "/br_one.mp3" },
      { challengeId: 15, imageSrc: "/two.svg", correct: false, text: "Dois", audioSrc: "/br_two.mp3" },
      { challengeId: 15, imageSrc: "/three.svg", correct: false, text: "Três", audioSrc: "/br_three.mp3" },

      { challengeId: 16, imageSrc: "/three.svg", correct: true, text: "Três", audioSrc: "/br_three.mp3" },
      { challengeId: 16, imageSrc: "/one.svg", correct: false, text: "Um", audioSrc: "/br_one.mp3" },
      { challengeId: 16, imageSrc: "/two.svg", correct: false, text: "Dois", audioSrc: "/br_two.mp3" },

      { challengeId: 17, imageSrc: "/one.svg", correct: true, text: "One", audioSrc: "/br_one.mp3" },
      { challengeId: 17, imageSrc: "/two.svg", correct: false, text: "Two", audioSrc: "/br_two.mp3" },
      { challengeId: 17, imageSrc: "/three.svg", correct: false, text: "Three", audioSrc: "/br_three.mp3" },

      { challengeId: 18, imageSrc: "/three.svg", correct: true, text: "Three", audioSrc: "/br_three.mp3" },
      { challengeId: 18, imageSrc: "/one.svg", correct: false, text: "Uno", audioSrc: "/br_one.mp3" },
      { challengeId: 18, imageSrc: "/two.svg", correct: false, text: "Dos", audioSrc: "/br_two.mp3" }
    ]);

    /* await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]); */

    /* await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]); */

    /*await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]); */
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
