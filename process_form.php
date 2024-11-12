<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Raccogli i dati dal form
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['comment'], FILTER_SANITIZE_STRING);

    // Valida i campi obbligatori
    if (empty($name) || empty($email) || empty($message)) {
        echo "Tutti i campi sono obbligatori.";
        exit;
    }

    // Imposta i dettagli dell'email
    $to = "tuoindirizzo@esempio.com"; // Sostituisci con il tuo indirizzo email
    $subject = "Nuovo messaggio di contatto";
    $body = "Nome: $name\nEmail: $email\n\nMessaggio:\n$message";
    $headers = "From: $email";

    // Invia l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Messaggio inviato con successo!";
    } else {
        echo "Errore nell'invio del messaggio. Riprova.";
    }
} else {
    echo "Metodo non supportato.";
}
?>
