<!DOCTYPE html>
<html lang="it" dir="ltr">
<link rel="icon" href="../favicon/favicon.ico" />
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript">
    function myFunction1() {
      var element = document.body;
      element.classList.toggle("dark-mode");
    }

    </script>
    <meta charset="utf-8">
    <title>Progetti</title>
    <link rel="stylesheet" href="../style.php">
    <link rel="stylesheet" href="../css/stylebarratop.css">
    <link rel="stylesheet" href="../css/stylepie.css">
    <link rel="stylesheet" href="../css/stylefiltri.css">
    <link rel="stylesheet" href="../css/stylepie.css">
    <link rel="stylesheet" href="../css/notte.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <script type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </head>
  <body>

      <div id="schermata_caricamento"></div>
      <script>
      var element = document.body;
      element.classList.toggle("white-mode");
        $("#schermata_caricamento").delay(0);//2900
        $("#schermata_caricamento").fadeOut(0);//200
        function myFunction() {
          var x = document.getElementById("myTopnav");
          if (x.className == "topnav") {
              x.className += " responsive";
          } else {
            x.className = "topnav";
          }
        }
      </script>



      <div id="header">
        <a href="../index.php"><div class="logo"></div></a>
        <div class="topnav" id="myTopnav">
          <ul>
            <div class="sx">
            <a href="../pagine/progetti.php" class="active">Progetti</a>
            <a href="../index.php">Home</a>


            <a href="../pagine/foto.html">Foto</a>

            <a href="../pagine/info.html">Info</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
              <i class="fa fa-bars"></i>
            </a>
            </div>
            <div class="dx">

            <div class="toggleWrapper">
            <input type="checkbox" onclick="myFunction1()"class="dn" id="dn"/>
            <label for="dn" class="toggle">
              <span class="toggle__handler">
                <span class="crater crater--1"></span>
                <span class="crater crater--2"></span>
                <span class="crater crater--3"></span>
              </span>
              <span class="star star--1"></span>
              <span class="star star--2"></span>
              <span class="star star--3"></span>
              <span class="star star--4"></span>
              <span class="star star--5"></span>
              <span class="star star--6"></span>
            </label>
          </div>
            </div>

          </ul>

        </div>
      </div>
      <div id="imagefiltri">
        <div class="descrizione">
          <div id="video">
            <div class="row">

              <div class="intro"><h2>Progetti/Notizie</h2></div>
              <?php
              include '../php/connessione.php';
              $q = "SELECT * FROM progetti order by id desc";

              $ris = $mysqli->query($q);

              $i = 0;

              foreach ($ris as $key) {
                $i = $i+1;
                $id = 'n'.$key["id"];
                echo "<a href='../pagine/".$key["titolo"];
                echo ".php'><div class='notizie v".$id;
                echo "'>";
                echo $key["titolo"];
                echo "</div></a>";
              }
               ?>

            </div>

        </div>
      </div>
      </div>

      <div id="piedipagina" class="piedipagina">
        <div class="menuSX">&copy
          <img src="../img/21.png" height="25px">
        </div>
        <div class="menuDX"><h4></h4></div>
      </div>
  </body>
</html>
