Points à contrôler :
============
* There must be 
  * single battleship (size of 4 cells)
  * 2 cruisers (size 3)
  * 3 destroyers (size 2)
  * 4 submarines (size 1)
* Each ship must be a straight line, except for submarines, which are just single cell.
* The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

Stratégie :
==========
* Parcourir la grille afin d'identifier tous les bouts > Taille, coo de chaque point
* Contrôle de forme
* Contrôle nb, taille
* Conrole proximité (distance entre 2 navires = min des distances points à points)




