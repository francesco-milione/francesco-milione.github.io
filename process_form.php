<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Raccogli e valida i dati dal form
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['comment'], FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($message)) {
        // Messaggio di errore se i campi sono vuoti
        header("Location: index.html?status=error&message=" . urlencode("Tutti i campi sono obbligatori."));
        exit;
    }

    // Dettagli dell'email
    $to = $email; // Sostituisci con il tuo indirizzo email
    $subject = "Richiesta di ricontatto";
    $body = "Ciao $name, ho ricevuto il tuo messaggio.\nTi ricontatterò io il prima possibile.\n Morena Galizia";
    $headers = "From: contatti@morenagaliziapsicologa.it";

    // Invio dell'email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html?status=success&message=" . urlencode("Messaggio inviato con successo!"));
    } else {
        header("Location: index.html?status=error&message=" . urlencode("Errore nell'invio del messaggio. Riprova."));
    }


    // Dettagli dell'email
    $to = $email; // Sostituisci con il tuo indirizzo email
    $subject = "Richiesta di ricontatto";
    $body = "Nome: $name\nEmail: $email\n\nMessaggio:\n$message";
    $headers = "From: contatti@morenagaliziapsicologa.it";

    // Invio dell'email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html?status=success&message=" . urlencode("Messaggio inviato con successo!"));
    } else {
        header("Location: index.html?status=error&message=" . urlencode("Errore nell'invio del messaggio. Riprova."));
    }


    exit;
} else {
    header("Location: index.html?status=error&message=" . urlencode("Metodo non supportato."));
    exit;
}
