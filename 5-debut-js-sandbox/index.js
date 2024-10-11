// ici on se declare une petite variable solution pour plus tard
//              ↓   ↓   ↓   ↓   ↓   ↓
let prixMoinsDixPourcents = "";
//on récupère la DONNEE BRUTE
//donnée attendue du style  : '54,57,18,89'
//              ↓   ↓   ↓   ↓   ↓   ↓
let saisieBrut = prompt(
  "Saisissez une liste de prix a reduire de 10%, chaque prix doit être séparés par une ,"
);

// .split(",") ->
//en utilisant la "," comme separation.
//on separe la chaine de charactère de type String
//en un tableau de chaines de charactères de type Array[String]
//  ex : '54,57,18,89' = ['54', '57', '18', '89']
//              ↓   ↓   ↓   ↓   ↓   ↓
let tableauDePrixEnString = saisieBrut.split(",");

// on Loop à travers notre nouveau tableau avec une boucle : for
//tableauDePrixEnString.lenght() étant la taille du tableau
//
//Array.lenght() => Int
//  ex : ["a","b","c"].length renvoie 3
//  ou ['54', '57', '18', '89'].lenght renvoie 4
//              ↓   ↓   ↓   ↓   ↓   ↓
for (let i = 0; i < tableauDePrixEnString.length; i++) {
  //chaque element String du tableau (tableauDePrixEnString[i])
  //est traduite en Nombre tel que
  //Number(String) renvoie Int
  //  ex : "54" devient 54
  //et stocké dans une valeure temporaire
  //              ↓   ↓   ↓   ↓   ↓   ↓
  let prixEnNombre = Number(tableauDePrixEnString[i]);

  //on fait le calcul suivant : (prixEnNombre * 0.1 + prixEnNombre),
  //  ex : pour currnumber=54 alors faire (54 - 54 *0.1)
  //on transforme le resultat en string avec .toString()
  //on l'ajoute à la fin chaine de charactère prixMoinsDixPourcents avec prixMoinsDixPourcents +=
  //              ↓   ↓   ↓   ↓   ↓   ↓
  prixMoinsDixPourcents += (prixEnNombre - prixEnNombre * 0.1).toString();
  prixMoinsDixPourcents += " ";
}

document.write("Solution 1 : " + prixMoinsDixPourcents);
// ****************************************************************************////

document.write("<br />");

//En une ligne :)
document.write(
  "Solution 2 : " +
    prompt(
      "Saisissez une liste de prix a reduire de 10%, chaque prix doit être séparés par une ,"
    )
      .split(",")
      .map((char) => {
        return Number(char) * 0.9;
      })
      .join(",")
);
