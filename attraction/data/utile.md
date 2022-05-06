# Ordre d'execution pour la Base de donnée

### Depuis le dossier oparc

1/ sqitch revert -y
---
2/ sqitch deploy association
---
3/ cd attraction/
---
4/ node data/data.js
---
5/ cd ..
---
6/ sqitch deploy
---