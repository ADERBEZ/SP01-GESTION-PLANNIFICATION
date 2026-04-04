# 📘 Documentation Technique CSS - Système SP-01

Ce document détaille le fonctionnement de la feuille de style centrale utilisée pour l'interface de gestion **SITE-01 : SP-01**. Le design suit une esthétique "industrielle/sécuritaire" basée sur une palette de verts et de gris, optimisée pour la clarté et la réactivité.

## 1. Fondations et Variables (`:root`)
Le projet utilise des variables CSS (Custom Properties) pour garantir une cohérence visuelle et faciliter la maintenance (notamment pour le Mode Sombre).
* **Couleurs :** Utilisation du vert (`#468F51`) comme couleur d'accentuation pour symboliser le statut "opérationnel".
* **Effets :** Ombres portées (`--shadow`) et transitions fluides (`--transition`) pour une interface moderne.
* **Reset :** Utilisation de `box-sizing: border-box` pour que les bordures et paddings n'augmentent pas la taille calculée des éléments.

## 2. Architecture du Header (En-tête)
Le header est l'élément le plus complexe, conçu pour être fixe et parfaitement aligné.

### 2.1 Le Conteneur Principal (`header`)
* **Position :** `fixed` en haut de page avec un `z-index` élevé (10000) pour rester au-dessus de tout le contenu lors du défilement.
* **Alignement :** `display: flex` et `align-items: center` pour forcer tous les éléments internes à être centrés verticalement sur une hauteur de 80px.

### 2.2 Navigation et Menu (`nav`)
* **Structure Flex :** Le `nav` possède `flex: 1` pour occuper tout l'espace disponible entre le logo de gauche et le titre de droite.
* **L'astuce du décalage :** `nav ul li.settings-container` utilise `margin-left: auto !important`. En Flexbox, cela agit comme un ressort qui pousse le bouton **PARAMÈTRES** tout à droite, contre le titre du site.
* **Barre de sélection :** Les liens (`a`) et le bouton paramètres possèdent une `border-bottom: 2px solid transparent`. Au survol (`:hover`) ou en mode actif, cette bordure devient verte, créant l'indicateur visuel sans faire "sauter" le texte.

### 2.3 Titre et Identité (`.site-title-container`)
* **Barre Verticale :** Une `div` de 4px de large avec la couleur principale sert de séparateur visuel avant le titre du site.

## 3. Structure du Contenu (`main`)
* **Compensation :** Le `margin-top: 120px` sur la balise `main` est crucial pour éviter que le contenu ne soit caché sous le header fixe (qui fait 80px).
* **Scroll-padding :** La propriété `scroll-padding-top` sur la balise `html` permet aux ancres de liens d'arriver pile au bon endroit sans être cachées par le header.

## 4. Composants Graphiques (Cards & Éléments)
* **Cartes d'accès :** Les conteneurs (`.member-card`, `.access-card`) ont des bordures gauches colorées (`border-left`) pour renforcer l'aspect dossier/fiche de sécurité.
* **Status Tags :** Des classes spécifiques (`.working`, `.delay`, `.done`) gèrent les couleurs des pastilles de statut dans les tableaux de bord.
* **Barres de progression :** Structure à deux niveaux (fond gris et remplissage vert) avec une transition `width 1s` pour un effet de chargement fluide.

## 5. Systèmes de Formulaires
* **Inputs :** Largeur 100% avec des coins légèrement arrondis.
* **Effet Focus :** Un halo vert (`box-shadow`) apparaît lors de la saisie pour améliorer l'accessibilité.
* **Bouton Submit :** Un bouton large, en majuscules, avec un effet de `letter-spacing` au survol pour un retour utilisateur dynamique.

## 6. Menu Déroulant (Dropdown)
* **Positionnement :** Le menu `.dropdown-content` est en `position: absolute` par rapport à son parent `.settings-container`.
* **Affichage :** Caché par défaut (`display: none`), il apparaît grâce à la classe JavaScript `.show`.
* **Animation :** Une `@keyframes slideDown` fait descendre le menu tout en augmentant son opacité pour une apparition élégante.

## 7. Mode Sombre (`.dark-mode`)
Le mode sombre est activé via une classe sur la balise `body`.
* **Inversion des couleurs :** Les fonds passent de blanc/gris clair à un gris anthracite (`#252525`) ou noir (`#1a1a1a`).
* **Adaptation :** Les textes passent en blanc ou gris clair pour maintenir un contraste de lecture élevé.
* **Compatibilité Formulaires :** Les champs de saisie s'assombrissent également pour ne pas éblouir l'utilisateur.
