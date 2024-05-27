package com.hectorservicios;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

import com.hectorservicios.models.Nota;

/**
 * Hello world!
 *
 */
public class App {

    public static void crearNota(Scanner scanner) {
        System.out.print("Introduce un titulo: ");
        String titulo = scanner.nextLine();

        System.out.print("Introduce una descripcion: ");
        String description = scanner.nextLine();

        Nota nota = new Nota(titulo, description, LocalDateTime.now());

        System.out.println("Nota creada los datos son los siguientes:");

        System.out.println(nota.getTitle());
        System.out.println(nota.getDescription());
        System.out.println(nota.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        char existAnswer = 'y';

        while (existAnswer != 'n' || existAnswer == 'y') {

            if (existAnswer == 'y') {
                crearNota(scanner);
                System.out.print("Do you want to create another note? (y/n): ");
            } else {
                System.out.print("Your answer is incorrect. Please choose yes or no (y/n): ");
            }

            existAnswer = scanner.nextLine().charAt(0);

        }

        scanner.close();

    }
}
