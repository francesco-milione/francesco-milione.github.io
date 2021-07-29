<?php
  include "../php/connessione.php";
  echo "Inserisci post -- <a href='/index.php'>TORNA ALLA HOME</a>";
  if(empty($_POST['invia'])){
    echo "<form action='".$_SERVER['PHP_SELF'];
    echo "' id=form method='POST'>";
    echo "<table><tr><td>Titolo<td><input type='text' name='titolo'>";
    echo "<tr><td>URL Immagine<td><input type='text' name='url'>";
    echo "<tr><td>Password di Modifica<td><input type='password' name='pw'>";
    echo "<tr><td>Testo<td><textarea rows='4' cols='60' name='testo' form='form'>Inserisci testo...</textarea>";
    echo "<tr><td><input type='submit' value='Inserisci' name='invia'>";
    echo "</table></form>";

  }else{
    if($_POST['pw'] != "Francesco"){
      echo '<script>alert("Non pupi inserire non hai il permesso")</script>';
    }else {
      $titolo = $_POST['titolo'];
      $testo = $_POST['testo'];
      $url = $_POST['url'];
      $q = "INSERT INTO progetti (id, titolo, testo, foto) VALUES (NULL,'".$titolo."', '".$testo."', '".$url."')";
      $ris = $mysqli->query($q) or die("Query fallita");
    }
  }

  ?>
