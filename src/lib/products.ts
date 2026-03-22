export type SpeciesTag = 'maskinonge' | 'brochet' | 'achigan' | 'dore' | 'truite' | 'tous'
export type LureType = 'bucktail' | 'crankbait' | 'swimbait' | 'topwater' | 'jig' | 'spinner' | 'cuillere' | 'softbait' | 'equipement' | 'glide-bait'

export interface Product {
  id: string
  name: string
  imageFile: string
  type: LureType
  typeFR: string
  species: SpeciesTag[]
  price: number
  description: string
  technique: string
  affiliateLink: string
  subSpecies?: string[]
}

export const products: Product[] = [

  // ══════════════════════════════════════════════════
  // MASKINONGÉ — 44 lures + gear
  // ══════════════════════════════════════════════════
  {
    id: 'm01', name: 'Mepps Musky Killer', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 24,
    description: 'Classique spinner inline québécois avec palettes larges et jupe en poil. Idéal pour couvrir l\'eau rapidement.',
    technique: 'Récupération rapide à moyenne. Finir chaque lancer par un 8 au bateau.',
    affiliateLink: 'https://amazon.ca/s?k=Mepps+Musky+Killer+fishing'
  },
  {
    id: 'm02', name: 'Mepps Black Fury Musky Killer Tandem', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 28,
    description: 'Double palette avec plus de flash et vibrations pour eaux teintées. Configuration tandem maximale.',
    technique: 'Vitesse soutenue dans les herbiers et bordures de courant.',
    affiliateLink: 'https://amazon.ca/s?k=Mepps+Black+Fury+Musky+Killer+Tandem+fishing'
  },
  {
    id: 'm03', name: 'Joe Bucher Buchertail 700', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 32,
    description: 'Bucktail fondateur de Joe Bucher. Couvre l\'eau rapidement en eau claire ou légèrement teintée.',
    technique: 'Brûlage rapide sur les hauts-fonds herbeux et les pointes de courant.',
    affiliateLink: 'https://amazon.ca/s?k=Joe+Bucher+Buchertail+700+musky+fishing'
  },
  {
    id: 'm04', name: 'Musky Mayhem Double Cowgirl', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 65,
    description: 'Le bucktail à grandes palettes par excellence pour provoquer des attaques réactives. Double Colorado XXL.',
    technique: 'Récupération régulière à vitesse soutenue, pause au 8 prolongée.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Mayhem+Double+Cowgirl+fishing'
  },
  {
    id: 'm05', name: 'Musky Frenzy Stagger Blade', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 48,
    description: 'Bucktail canadien de confiance avec profil de palette décalé. Vibrations distinctives.',
    technique: 'Pêche des herbiers et bordures de mauvaises herbes à vitesse variable.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Frenzy+Stagger+Blade+fishing'
  },
  {
    id: 'm06', name: 'Chaos Tackle Medussa', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 42,
    description: 'Bucktail artisanal à jupes multiples créant une silhouette volumineuse. Très attractif en faible luminosité.',
    technique: 'Couchers de soleil et aube sur les herbiers peu profonds, figure-8 obligatoire.',
    affiliateLink: 'https://amazon.ca/s?k=Chaos+Tackle+Medussa+musky+fishing'
  },
  {
    id: 'm07', name: 'Chaos Tackle Double Showgirl', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 65,
    description: 'Double configuration en sécurité avec énorme profil d\'eau déplacée. Pour maskinongés réticents.',
    technique: 'Récupération lente-moyenne avec pauses pour les gros spécimens en eau froide.',
    affiliateLink: 'https://amazon.ca/s?k=Chaos+Tackle+Double+Showgirl+musky+fishing'
  },
  {
    id: 'm08', name: 'Tackle Industries Cowgirl Bucktail', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 58,
    description: 'Version Cowgirl premium avec palettes tandem Colorado. Incontournable dans l\'arsenal du pêcheur de maskinongés.',
    technique: 'Vitesse de récupération rapide pour provoquer des strikes réactifs.',
    affiliateLink: 'https://amazon.ca/s?k=Tackle+Industries+Cowgirl+Bucktail+musky+fishing'
  },
  {
    id: 'm09', name: 'Mad Chasse Bucktail Custom', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 55,
    description: 'Bucktail artisanal québécois avec suivi local fort. Coloris adaptés aux eaux du Québec.',
    technique: 'Méthode classique de récupération rapide avec arrêts dans les poches.',
    affiliateLink: 'https://amazon.ca/s?k=Mad+Chasse+Bucktail+musky+fishing'
  },
  {
    id: 'm10', name: 'Double #10 Bucktail / Twin Tens', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail',
    species: ['maskinonge'], price: 38,
    description: 'Leurre de recherche à haute vitesse avec double palettes #10. Couvre l\'eau rapidement pour les maskinongés actifs.',
    technique: 'Brûlage agressif sur les flats et en eaux ouvertes. Incontournable en juillet-août.',
    affiliateLink: 'https://amazon.ca/s?k=Double+10+Bucktail+Twin+Tens+musky+fishing'
  },
  {
    id: 'm11', name: 'Musky Innovations Bull Dawg 9"', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['maskinonge'], price: 35,
    description: 'Leurre en caoutchouc emblématique pour maskinongés. Action de nage réaliste irrésistible.',
    technique: 'Lancer-compter-nager sur les cassures profondes. Récupération lente avec pauses.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Innovations+Bull+Dawg+fishing'
  },
  {
    id: 'm12', name: 'Musky Innovations Swimming Dawg', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['maskinonge'], price: 38,
    description: 'Version nageur du Bull Dawg pour les poissons en suspension et en profondeur.',
    technique: 'Nage lente et régulière avec une queue battante prononcée. Excellent en automne.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Innovations+Swimming+Dawg+fishing'
  },
  {
    id: 'm13', name: 'Suzy Sucker Rubber Bait 10"', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['maskinonge'], price: 40,
    description: 'Grand plastique souple imitant un meunier noir. Idéal pour les fin de saison et poissons profonds.',
    technique: 'Nage lente en fond ou mi-eau. Excellent après la première gelée.',
    affiliateLink: 'https://amazon.ca/s?k=Suzy+Sucker+musky+rubber+bait+fishing'
  },
  {
    id: 'm14', name: 'Savage Gear 3D Burbot Ribbon Tail', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['maskinonge'], price: 44,
    description: 'Imitation lotte ultra-réaliste avec queue ruban. Profil naturel et action de nage impressionnante.',
    technique: 'Nage lente près du fond sur les cassures. Excellent en eaux froides d\'automne.',
    affiliateLink: 'https://amazon.ca/s?k=Savage+Gear+3D+Burbot+Ribbon+Tail+fishing'
  },
  {
    id: 'm15', name: 'Savage Gear 3D Line Thru Trout', imageFile: 'glide-bait.jpg', type: 'glide-bait', typeFR: 'Glide Bait',
    species: ['maskinonge'], price: 55,
    description: 'Imitation truite réaliste avec système Line Thru pour les gros maskinongés. Action de glisse naturelle.',
    technique: 'Tirées courtes avec pauses longues. Parfait après les passages de front froid.',
    affiliateLink: 'https://amazon.ca/s?k=Savage+Gear+3D+Line+Thru+Trout+fishing'
  },
  {
    id: 'm16', name: 'Suick Thriller 9"', imageFile: 'glide-bait.jpg', type: 'glide-bait', typeFR: 'Jerkbait / Glide',
    species: ['maskinonge'], price: 28,
    description: 'Jerkbait plongeur-remontant classique. La référence absolue en eau fraîche pour les maskinongés réticents.',
    technique: 'Traction-pause avec des descentes contrôlées. Excellent en eaux froides et après fronts.',
    affiliateLink: 'https://amazon.ca/s?k=Suick+Thriller+musky+jerkbait+fishing'
  },
  {
    id: 'm17', name: 'Reef Hawg Glide Bait', imageFile: 'glide-bait.jpg', type: 'glide-bait', typeFR: 'Glide Bait',
    species: ['maskinonge'], price: 32,
    description: 'Glide bait artisanal pour maskinongés suiveurs et neutres. Action latérale contrôlée.',
    technique: 'Glissade côte-à-côte lente. Idéal pour les poissons qui suivent mais ne mordent pas.',
    affiliateLink: 'https://amazon.ca/s?k=Reef+Hawg+glide+bait+musky+fishing'
  },
  {
    id: 'm18', name: 'Phantom Softail Jerkbait', imageFile: 'glide-bait.jpg', type: 'glide-bait', typeFR: 'Glide Bait',
    species: ['maskinonge'], price: 38,
    description: 'Glide bait subtil avec queue souple intégrée. Action de glisse plus naturelle pour les conditions difficiles.',
    technique: 'Pauses longues et glissades douces en eau claire et froide.',
    affiliateLink: 'https://amazon.ca/s?k=Phantom+Softail+musky+jerkbait+fishing'
  },
  {
    id: 'm19', name: 'Drifter Tackle Believer 7"', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 28,
    description: 'Crankbait classique de trolling et lancer pour maskinongés. Wobble prononcé et fiable.',
    technique: 'Trolling à 3-3.5 km/h sur les flats et cassures. Excellent pour couvrir les zones.',
    affiliateLink: 'https://amazon.ca/s?k=Drifter+Tackle+Believer+musky+crankbait+fishing'
  },
  {
    id: 'm20', name: 'Joe Bucher Depth Raider', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 32,
    description: 'Crankbait de trolling de référence par Joe Bucher. Plongée profonde et action de nage inégalée.',
    technique: 'Trolling à 3-3.5 mph sur les berges profondes, points et transitions.',
    affiliateLink: 'https://amazon.ca/s?k=Joe+Bucher+Depth+Raider+musky+fishing'
  },
  {
    id: 'm21', name: 'Grandma 10" Jerkbait', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 30,
    description: 'Minnowbait éprouvé sur les flats du fleuve Saint-Laurent et structures ouvertes.',
    technique: 'Trolling et lancer pour les maskinongés suspendus sur les herbiers profonds.',
    affiliateLink: 'https://amazon.ca/s?k=Grandma+10+musky+jerkbait+fishing'
  },
  {
    id: 'm22', name: 'Jake 8" Deep Diver', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 26,
    description: 'Crankbait plongeur classique pour les eaux profondes de fin de saison.',
    technique: 'Trolling sur les cassures et structures profondes en automne.',
    affiliateLink: 'https://amazon.ca/s?k=Jake+8+inch+musky+deep+diver+fishing'
  },
  {
    id: 'm23', name: 'Rapala Super Shad Rap', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 24,
    description: 'Gros crankbait de trolling et de lancer avec action de cisaillement unique.',
    technique: 'Trolling à vitesse modérée, aussi excellent en lancer-récupération.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Super+Shad+Rap+musky+fishing'
  },
  {
    id: 'm24', name: 'Rapala X-Rap Magnum Trolling', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 34,
    description: 'Minnow de trolling moderne avec profil baitfish réaliste. Excellent pour le fleuve Saint-Laurent.',
    technique: 'Trolling sur les flats et structures à 2.5-3.5 mph.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+X-Rap+Magnum+musky+trolling+fishing'
  },
  {
    id: 'm25', name: 'B&N Deep Shad', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 29,
    description: 'Leurre de trolling profond pour atteindre les maskinongés en eau profonde.',
    technique: 'Trolling avec plombs ou downrigger sur les structures profondes 20-40 pieds.',
    affiliateLink: 'https://amazon.ca/s?k=B%26N+Deep+Shad+musky+fishing'
  },
  {
    id: 'm26', name: 'B&N Shallow Shad', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 27,
    description: 'Version eau peu profonde pour les structures de surface et herbiers peu profonds.',
    technique: 'Trolling lent ou lancer-récupération sur les tops d\'herbiers.',
    affiliateLink: 'https://amazon.ca/s?k=B%26N+Shallow+Shad+musky+fishing'
  },
  {
    id: 'm27', name: 'Supernatural Headlock Crankbait', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['maskinonge'], price: 45,
    description: 'Crankbait premium pour le trolling et le lancer. Action très attractive.',
    technique: 'Trolling précis sur les pointes, récifs et transitions herbier-roche.',
    affiliateLink: 'https://amazon.ca/s?k=Supernatural+Headlock+musky+crankbait+fishing'
  },
  {
    id: 'm28', name: 'Joe Bucher Dancin\' Raider', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 28,
    description: 'Topwater walker de Joe Bucher. Provoque des attaques explosives en surface.',
    technique: 'Action de walk-the-dog au coucher du soleil sur les herbiers peu profonds.',
    affiliateLink: 'https://amazon.ca/s?k=Joe+Bucher+Dancin+Raider+musky+topwater+fishing'
  },
  {
    id: 'm29', name: 'Cisco Kid Topper Prop Bait', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 24,
    description: 'Prop bait à forte perturbation de surface. Un classique pour les maskinongés en eau calme.',
    technique: 'Récupération irrégulière avec pauses sur les herbiers peu profonds en période chaude.',
    affiliateLink: 'https://amazon.ca/s?k=Cisco+Kid+Topper+prop+bait+musky+fishing'
  },
  {
    id: 'm30', name: 'Whopper Plopper 190 (Musky)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 22,
    description: 'Le topwater à récupération droite le plus bruyant du marché. Attaque garantie en eau chaude.',
    technique: 'Récupération régulière et lente au coucher du soleil et à l\'aube.',
    affiliateLink: 'https://amazon.ca/s?k=Whopper+Plopper+190+musky+topwater+fishing'
  },
  {
    id: 'm31', name: 'TopRaider Prop Topwater', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 26,
    description: 'Prop bait pour soirées calmes et faible luminosité. Deux hélices pour un maximum de perturbation.',
    technique: 'Meilleur en eaux calmes, au lever et coucher du soleil avec récupération lente.',
    affiliateLink: 'https://amazon.ca/s?k=TopRaider+prop+topwater+musky+fishing'
  },
  {
    id: 'm32', name: 'Joe Bucher SlopMaster Spinnerbait', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 30,
    description: 'Spinnerbait pour couvrir les herbiers denses et zones de slop. Sans accroche.',
    technique: 'Récupération lente en surface sur les tops de mauvaises herbes denses.',
    affiliateLink: 'https://amazon.ca/s?k=Joe+Bucher+SlopMaster+musky+spinnerbait+fishing'
  },
  {
    id: 'm33', name: 'Ezoko Musky Inline Spinner', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['maskinonge'], price: 32,
    description: 'Spinner inline artisanal pour maskinongés. Qualité supérieure et action irréprochable.',
    technique: 'Récupération rapide à vitesse soutenue. Finir chaque lancer par un 8.',
    affiliateLink: 'https://amazon.ca/s?k=Ezoko+Musky+Inline+Spinner+fishing'
  },
  {
    id: 'm34', name: 'Musky Judd Buzzbait Inline', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 22,
    description: 'Buzzbait inline pour les herbiers peu profonds. Commotion de surface maximale.',
    technique: 'Récupération rapide pour garder la lame en surface sur les hauts-fonds herbeux.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Judd+Buzzbait+Inline+fishing'
  },
  {
    id: 'm35', name: 'Musky Innovations Weedinator', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['maskinonge'], price: 35,
    description: 'Leurre topwater sans accroche pour les herbiers les plus denses. Glisse sur le slop.',
    technique: 'Glissade lente sur les mats de végétation et les touffes d\'herbiers.',
    affiliateLink: 'https://amazon.ca/s?k=Musky+Innovations+Weedinator+fishing'
  },
  {
    id: 'm36', name: 'Eppinger Dardevle XL Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['maskinonge', 'brochet'], price: 18,
    description: 'Grande cuillère Dardevle classique. Incontournable pour les maskinongés et gros brochets.',
    technique: 'Récupération régulière avec tremblements occasionnels. Excellent en eau claire.',
    affiliateLink: 'https://amazon.ca/s?k=Eppinger+Dardevle+XL+spoon+fishing'
  },
  {
    id: 'm37', name: 'Savage Gear Hybrid Pike/Musky Swimbait', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['maskinonge', 'brochet'], price: 44,
    description: 'Swimbait réaliste pour maskinongés et gros brochets. Corps articulé avec action impressionnante.',
    technique: 'Nage lente et régulière près du fond ou en mi-eau selon activité.',
    affiliateLink: 'https://amazon.ca/s?k=Savage+Gear+Hybrid+Pike+Musky+Swimbait+fishing'
  },
  {
    id: 'm38', name: 'St. Croix Mojo Musky 8\'6" Rod', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 385,
    description: 'Canne à lancer haute performance pour maskinongés. Puissance et précision optimales.',
    technique: 'Compatible avec tous leurres de 2-8 oz. Backbone fort pour les figures-8.',
    affiliateLink: 'https://amazon.ca/s?k=St+Croix+Mojo+Musky+rod+fishing'
  },
  {
    id: 'm39', name: 'Daiwa Lexa WN 300 Baitcaster', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 310,
    description: 'Moulinet baitcaster puissant pour les gros leurres de maskinongé. Frein impressionnant.',
    technique: 'Monter avec 80-100 lb de tresse pour une puissance maximale.',
    affiliateLink: 'https://amazon.ca/s?k=Daiwa+Lexa+WN+300+baitcaster+musky+fishing'
  },
  {
    id: 'm40', name: 'PowerPro 80lb Spectra Braid', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 45,
    description: 'Tresse ultra-résistante pour la pêche au maskinongé. Faible élasticité et haute sensibilité.',
    technique: 'Standard pour la pêche au maskinongé. Ajouter un chef de ligne de 100 lb.',
    affiliateLink: 'https://amazon.ca/s?k=PowerPro+80lb+Spectra+Braid+fishing'
  },
  {
    id: 'm41', name: 'Okuma Psycho Stick 8\' Musky Rod', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 195,
    description: 'Canne économique de qualité pour la pêche au maskinongé. Idéale pour les débutants.',
    technique: 'Parfaite pour les leurres de 2-5 oz. Bonne option entrée de gamme.',
    affiliateLink: 'https://amazon.ca/s?k=Okuma+Psycho+Stick+musky+rod+fishing'
  },
  {
    id: 'm42', name: 'American Fishing Wire Leader 100lb', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 28,
    description: 'Chef de ligne câblé pour maskinongés. Protection maximale contre les dents tranchantes.',
    technique: 'Minimum 100 lb pour maskinongé. Changer après chaque capture.',
    affiliateLink: 'https://amazon.ca/s?k=American+Fishing+Wire+Leader+100lb+musky+fishing'
  },
  {
    id: 'm43', name: 'Frabill Power Catch Musky Net', imageFile: 'net.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 120,
    description: 'Grande épuisette pour la capture et remise à l\'eau des maskinongés. Filet sans nœuds.',
    technique: 'Garder le poisson dans l\'eau. Pinces longues et outil de remise à l\'eau recommandés.',
    affiliateLink: 'https://amazon.ca/s?k=Frabill+Power+Catch+Musky+Net+fishing'
  },
  {
    id: 'm44', name: 'Okuma Komodo SS 364 Baitcaster', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement',
    species: ['maskinonge'], price: 275,
    description: 'Moulinet baitcaster robuste pour la pêche intensive au maskinongé.',
    technique: 'Rapport 5.4:1 idéal pour les gros bucktails et leurres en caoutchouc.',
    affiliateLink: 'https://amazon.ca/s?k=Okuma+Komodo+SS+baitcaster+musky+fishing'
  },

  // ══════════════════════════════════════════════════
  // BROCHET — 22 lures
  // ══════════════════════════════════════════════════
  {
    id: 'b01', name: 'Eppinger Dardevle Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['brochet'], price: 12,
    description: 'LA cuillère classique pour brochet. Présente depuis des décennies sur toutes les lacs québécois.',
    technique: 'Récupération régulière avec petits tremblements. Coloris rouge/blanc ou cinq de carreau.',
    affiliateLink: 'https://amazon.ca/s?k=Eppinger+Dardevle+Spoon+pike+fishing'
  },
  {
    id: 'b02', name: 'Dardevle Weedless Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['brochet'], price: 14,
    description: 'Version sans-accroche du Dardevle pour pêcher dans le chou aquatique et les joncs.',
    technique: 'Glissement lent sur les tops de végétation. Idéal pour les eaux peu profondes.',
    affiliateLink: 'https://amazon.ca/s?k=Dardevle+Weedless+Spoon+pike+fishing'
  },
  {
    id: 'b03', name: 'Five of Diamonds Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['brochet'], price: 11,
    description: 'Coloris iconique canadien en cinq de carreau. Classique du brochet depuis des générations.',
    technique: 'Récupération constante sur les herbiers ou trolling lent sur les bordures.',
    affiliateLink: 'https://amazon.ca/s?k=Five+of+Diamonds+Spoon+pike+fishing'
  },
  {
    id: 'b04', name: 'Gibbs Kit-A-Mat Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['brochet'], price: 13,
    description: 'Cuillère canadienne excellent dans les courants. Vibrations distinctives.',
    technique: 'Excellente dans le courant des rivières. Lancer en travers et récupération avec la rivière.',
    affiliateLink: 'https://amazon.ca/s?k=Gibbs+Kit-A-Mat+pike+fishing'
  },
  {
    id: 'b05', name: 'Johnson Silver Minnow Weedless', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['brochet', 'achigan'], price: 12,
    description: 'Cuillère weedless classique pour les couvertures denses et les joncs. Incontournable.',
    technique: 'Glissade lente sur la végétation. Ajouter un trailer pour plus d\'action.',
    affiliateLink: 'https://amazon.ca/s?k=Johnson+Silver+Minnow+Weedless+fishing'
  },
  {
    id: 'b06', name: 'Mepps Giant Killer Spinner', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['brochet'], price: 16,
    description: 'Grande version du Mepps pour les gros brochets. Palette #5 et jupe en poil.',
    technique: 'Récupération soutenue à vitesse constante. Excellent dans les herbiers ouverts.',
    affiliateLink: 'https://amazon.ca/s?k=Mepps+Giant+Killer+pike+spinner+fishing'
  },
  {
    id: 'b07', name: 'Blue Fox Vibrax Musky/Pike', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['brochet'], price: 14,
    description: 'Spinner Blue Fox avec rotation immédiate et vibrations fortes. Fiable en toutes conditions.',
    technique: 'Récupération à vitesse modérée. Corps en laiton amplifie les vibrations.',
    affiliateLink: 'https://amazon.ca/s?k=Blue+Fox+Vibrax+pike+spinner+fishing'
  },
  {
    id: 'b08', name: 'Booyah Pikee Spinnerbait', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['brochet'], price: 16,
    description: 'Spinnerbait conçu spécifiquement pour le brochet. Excellent leurre de recherche dans les herbiers.',
    technique: 'Récupération lente à modérée dans les herbiers denses. Sans accroche naturel.',
    affiliateLink: 'https://amazon.ca/s?k=Booyah+Pikee+Spinnerbait+pike+fishing'
  },
  {
    id: 'b09', name: 'Rapala Husky Jerk 14 Pike', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['brochet'], price: 22,
    description: 'Minnowbait suspending de 14 cm. Attaque les brochets embusqués avec une action naturelle.',
    technique: 'Traction-pause-drift pour les brochets neutres. Trolling lent en profondeur.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Husky+Jerk+14+pike+fishing'
  },
  {
    id: 'b10', name: 'Bomber Magnum Long A', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['brochet'], price: 18,
    description: 'Grand minnow de trolling/lancer avec profil baitfish classique pour brochets.',
    technique: 'Trolling à 2-3 mph le long des bordures d\'herbiers et des transitions.',
    affiliateLink: 'https://amazon.ca/s?k=Bomber+Magnum+Long+A+pike+fishing'
  },
  {
    id: 'b11', name: 'Yo-Zuri Crystal Minnow Pike', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['brochet'], price: 20,
    description: 'Minnow dur avec corps translucide réaliste. Attaque les brochets visuels.',
    technique: 'Jerkbait avec pauses ou trolling lent. Excellent en eau claire.',
    affiliateLink: 'https://amazon.ca/s?k=Yo-Zuri+Crystal+Minnow+pike+fishing'
  },
  {
    id: 'b12', name: 'Savage Gear 3D Burbot Pike', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['brochet'], price: 38,
    description: 'Imitation lotte réaliste pour les gros brochets. Profil naturel irrésistible.',
    technique: 'Nage lente près du fond sur les cassures et zones profondes.',
    affiliateLink: 'https://amazon.ca/s?k=Savage+Gear+3D+Burbot+pike+fishing'
  },
  {
    id: 'b13', name: 'Berkley PowerBait Ripple Shad (Pike)', imageFile: 'softbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['brochet'], price: 11,
    description: 'Paddletail souple pour brochet avec attractant PowerBait intégré. Très efficace.',
    technique: 'Récupération lente sur tête plombée dans les herbiers profonds.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+PowerBait+Ripple+Shad+pike+fishing'
  },
  {
    id: 'b14', name: 'Kalin\'s Lunker Grub 5"', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Softbait',
    species: ['brochet'], price: 8,
    description: 'Classique grub à queue bouclée pour brochet. Simple et redoutablement efficace.',
    technique: 'Lancer-compter-récupérer sur les cassures profondes et les transitions.',
    affiliateLink: 'https://amazon.ca/s?k=Kalin+Lunker+Grub+pike+fishing'
  },
  {
    id: 'b15', name: 'Lunker City Shaker Swimbait', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['brochet'], price: 10,
    description: 'Swimbait semi-rigide avec action de queue prononcée. Excellent pour les brochets actifs.',
    technique: 'Récupération lente-stop-go sur les cassures et points de structure.',
    affiliateLink: 'https://amazon.ca/s?k=Lunker+City+Shaker+swimbait+pike+fishing'
  },
  {
    id: 'b16', name: 'Bucktail Jig / J-Mac Heavy', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['brochet'], price: 9,
    description: 'Jig bucktail lourd pour les brochets profonds. Excellent en eau froide.',
    technique: 'Jigging vertical au-dessus des structures ou lancer-hop sur les cassures.',
    affiliateLink: 'https://amazon.ca/s?k=bucktail+jig+heavy+pike+fishing'
  },
  {
    id: 'b17', name: 'Large Paddletail Swimbait (Pike)', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['brochet'], price: 12,
    description: 'Grand swimbait paddletail en firetiger ou chartreuse. Couvre beaucoup d\'eau.',
    technique: 'Slow-roll près du fond ou à mi-eau selon l\'activité des poissons.',
    affiliateLink: 'https://amazon.ca/s?k=large+paddletail+swimbait+pike+fishing'
  },
  {
    id: 'b18', name: 'Topwater Buzzbait (Pike)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['brochet'], price: 10,
    description: 'Buzzbait pour brochets agressifs en été. Explosions spectaculaires garanties.',
    technique: 'Récupération rapide sur les tops d\'herbiers en période chaude.',
    affiliateLink: 'https://amazon.ca/s?k=buzzbait+topwater+pike+fishing'
  },
  {
    id: 'b19', name: 'Strike King Swim Jig (Pike)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['brochet', 'achigan'], price: 9,
    description: 'Swim jig polyvalent pour brochets et achigans. Parfait dans les herbiers.',
    technique: 'Nage lente à modérée le long des bordures de végétation.',
    affiliateLink: 'https://amazon.ca/s?k=Strike+King+Swim+Jig+pike+fishing'
  },
  {
    id: 'b20', name: 'Reef Runner 900 Series', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['brochet'], price: 20,
    description: 'Crankbait de trolling avec action de nage à grande profondeur. Pour les brochets profonds.',
    technique: 'Trolling à 2 mph sur les structures profondes et les transitions.',
    affiliateLink: 'https://amazon.ca/s?k=Reef+Runner+900+Series+pike+fishing'
  },
  {
    id: 'b21', name: 'Large Safety-Pin Spinnerbait', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['brochet'], price: 12,
    description: 'Spinnerbait lourd à double palettes pour les brochets cachés dans la végétation.',
    technique: 'Slow-roll au travers des herbiers et joncs. Sans accroche efficace.',
    affiliateLink: 'https://amazon.ca/s?k=large+spinnerbait+pike+fishing'
  },
  {
    id: 'b22', name: 'Rapala X-Rap Shallow Pike', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['brochet'], price: 20,
    description: 'Minnow peu profond idéal pour les brochets de printemps dans les eaux chaudes.',
    technique: 'Traction-pause en eau peu profonde au printemps et en automne.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+X-Rap+Shallow+pike+fishing'
  },

  // ══════════════════════════════════════════════════
  // DORÉ / WALLEYE — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'w01', name: 'Rapala Jigging Rap #9', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['dore'], price: 14,
    description: 'Leurre de jigging vertical incontournable pour le doré. Frappe les poissons en eau froide et profonde.',
    technique: 'Jigging vertical avec courtes secousses sur les hauts-fonds, récifs et structures profondes.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Jigging+Rap+9+walleye+fishing'
  },
  {
    id: 'w02', name: 'VMC Bucktail Jig 1/4oz', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['dore'], price: 8,
    description: 'Jig bucktail classique pour doré. Profil discret et naturel qui trompe les poissons méfiants.',
    technique: 'Dérive au fond dans le courant ou hop lent sur les hauts-fonds de gravier.',
    affiliateLink: 'https://amazon.ca/s?k=VMC+Bucktail+Jig+walleye+fishing'
  },
  {
    id: 'w03', name: 'VMC Hot Skirt Glow Jig', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['dore'], price: 9,
    description: 'Jig à jupe luisante pour les eaux sombres et la pêche crépusculaire du doré.',
    technique: 'Activer la luminescence avant de descendre. Jigging vertical lent en basse luminosité.',
    affiliateLink: 'https://amazon.ca/s?k=VMC+Hot+Skirt+Glow+Jig+walleye+fishing'
  },
  {
    id: 'w04', name: 'Berkley Gulp Minnow 3"', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Softbait',
    species: ['dore'], price: 10,
    description: 'Minnow souple avec attractant Gulp extrêmement efficace pour doré. Un classique.',
    technique: 'Monter sur tête plombée et dériver au fond dans les courants.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+Gulp+Minnow+walleye+fishing'
  },
  {
    id: 'w05', name: 'Berkley Flicker Minnow', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 16,
    description: 'Crankbait de trolling estival pour doré. Action erratique à très faibles vitesses.',
    technique: 'Trolling à 1.8-2.5 mph sur les flats et cassures en été.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+Flicker+Minnow+walleye+fishing'
  },
  {
    id: 'w06', name: 'Berkley Flicker Shad', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 16,
    description: 'L\'un des meilleurs crankbaits de trolling pour doré. Action prononcée à basses vitesses.',
    technique: 'Trolling à 1.5-2.5 mph. Varier la profondeur selon la thermocline.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+Flicker+Shad+walleye+fishing'
  },
  {
    id: 'w07', name: 'Rapala Shad Rap #7', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 16,
    description: 'Crankbait de printemps par excellence pour le doré. Wobble naturel et délicat.',
    technique: 'Trolling lent au printemps sur les hauts-fonds et graviers.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Shad+Rap+7+walleye+fishing'
  },
  {
    id: 'w08', name: 'Cotton Cordell Wally Diver', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 14,
    description: 'Crankbait classique conçu spécialement pour le doré. Action très naturelle.',
    technique: 'Trolling ou lancer-récupération à faible vitesse sur les structures.',
    affiliateLink: 'https://amazon.ca/s?k=Cotton+Cordell+Wally+Diver+walleye+fishing'
  },
  {
    id: 'w09', name: 'Rapala Down Deep Husky Jerk', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 18,
    description: 'Minnow suspending pour les profondeurs automnales. Irrésistible pour les dorés profonds.',
    technique: 'Trolling profond à l\'automne. Aussi efficace en lancer sur les structures profondes.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Down+Deep+Husky+Jerk+walleye+fishing'
  },
  {
    id: 'w10', name: 'Rapala Tail Dancer', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 18,
    description: 'Crankbait profond à wobble ample. Excellent pour les dorés d\'été suspendus.',
    technique: 'Trolling profond à 2-2.5 mph. Queue qui danse attire même les poissons neutres.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Tail+Dancer+walleye+fishing'
  },
  {
    id: 'w11', name: 'Northland Thumper Jig 3/8oz', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['dore'], price: 9,
    description: 'Jig à tête spéciale avec palette Colorado intégrée. Vibrations perceptibles pour le doré.',
    technique: 'Hop et dérive au fond. La palette émettrice de vibrations attire de loin.',
    affiliateLink: 'https://amazon.ca/s?k=Northland+Thumper+Jig+walleye+fishing'
  },
  {
    id: 'w12', name: 'Swedish Pimple Blade Bait', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Blade Bait',
    species: ['dore'], price: 10,
    description: 'Blade bait métallique pour jigging vertical. Excellent en eau froide et courant fort.',
    technique: 'Jigging agressif en eau froide. Frappe les dorés en suspension.',
    affiliateLink: 'https://amazon.ca/s?k=Swedish+Pimple+blade+bait+walleye+fishing'
  },
  {
    id: 'w13', name: 'Spinner Harness / Crawler Harness', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['dore'], price: 8,
    description: 'Harness classique pour trolling et dérive. Attire les dorés en leur offrant vibrations et mouvement.',
    technique: 'Trolling lent ou dérive dans le courant. Très efficace au printemps et automne.',
    affiliateLink: 'https://amazon.ca/s?k=Spinner+Harness+Crawler+Harness+walleye+fishing'
  },
  {
    id: 'w14', name: 'Storm Hot \'N Tot', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['dore'], price: 14,
    description: 'Crankbait erratique pour les dorés agressifs. Action irrégulière qui provoque l\'attaque.',
    technique: 'Trolling lent ou lancer-récupération. Meilleur en courant ou vent modéré.',
    affiliateLink: 'https://amazon.ca/s?k=Storm+Hot+N+Tot+walleye+fishing'
  },
  {
    id: 'w15', name: 'Berkley Power Grub 4"', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Softbait',
    species: ['dore'], price: 9,
    description: 'Grub à queue bouclée avec PowerBait intégré. Imite les petits poissons à la perfection.',
    technique: 'Sur tête plombée 1/4-1/2 oz dans le courant ou au fond des structures.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+Power+Grub+4+walleye+fishing'
  },
  {
    id: 'w16', name: 'Marabou Jig 1/4oz', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['dore'], price: 7,
    description: 'Jig marabou avec action respirante naturelle dans le courant. Discret et efficace.',
    technique: 'Dérive au fond dans les courants. Les fibres bougent même quand le jig est statique.',
    affiliateLink: 'https://amazon.ca/s?k=Marabou+Jig+walleye+fishing'
  },

  // ══════════════════════════════════════════════════
  // ACHIGAN À PETITE BOUCHE — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'apm01', name: 'Z-Man Finesse TRD (Ned Rig)', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Ned Rig',
    species: ['achigan'], price: 10,
    subSpecies: ['smallmouth'],
    description: 'Le ned rig classique pour achigan à petite bouche. Incontournable en eau rocheuse.',
    technique: 'Traîner lentement au fond sur les rochers et graviers. Pauses fréquentes.',
    affiliateLink: 'https://amazon.ca/s?k=Z-Man+Finesse+TRD+Ned+Rig+smallmouth+bass+fishing'
  },
  {
    id: 'apm02', name: 'Megabass Vision 110 Jerkbait', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Jerkbait Premium',
    species: ['achigan', 'dore'], price: 28,
    subSpecies: ['smallmouth'],
    description: 'Jerkbait premium japonais pour achigan à petite bouche en eau claire. Action parfaite.',
    technique: 'Traction-pause-drift en eau froide. Excellent au printemps et à l\'automne.',
    affiliateLink: 'https://amazon.ca/s?k=Megabass+Vision+110+jerkbait+smallmouth+bass+fishing'
  },
  {
    id: 'apm03', name: 'Tube Jig 4" (Smallmouth)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Tube Jig',
    species: ['achigan'], price: 8,
    subSpecies: ['smallmouth'],
    description: 'Le tube jig est LA pêche de l\'achigan à petite bouche. Imite les écrevisses et petits poissons.',
    technique: 'Traîner et hopper au fond sur les rochers, herbiers et graviers.',
    affiliateLink: 'https://amazon.ca/s?k=tube+jig+4+inch+smallmouth+bass+fishing'
  },
  {
    id: 'apm04', name: 'Drop Shot Worm (Smallmouth)', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Drop Shot',
    species: ['achigan'], price: 9,
    subSpecies: ['smallmouth'],
    description: 'Technique finesse pour achigans profonds et méfiants. Efficace en pression de pêche élevée.',
    technique: 'Shaking subtil sur les structures profondes et les cassures en eau claire.',
    affiliateLink: 'https://amazon.ca/s?k=drop+shot+worm+smallmouth+bass+finesse+fishing'
  },
  {
    id: 'apm05', name: 'Berkley MaxScent Flat Worm', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Drop Shot',
    species: ['achigan'], price: 12,
    subSpecies: ['smallmouth'],
    description: 'Le meilleur ver plat pour drop shot. Technologie MaxScent avec attractant puissant.',
    technique: 'Drop shot sur les structures profondes. Secousses légères et pauses longues.',
    affiliateLink: 'https://amazon.ca/s?k=Berkley+MaxScent+Flat+Worm+drop+shot+fishing'
  },
  {
    id: 'apm06', name: 'Keitech FAT Swing Impact 3.8"', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['achigan'], price: 14,
    subSpecies: ['smallmouth'],
    description: 'Swimbait japonais polyvalent pour achigan. Paddletail efficace sur structure profonde.',
    technique: 'Swim jig ou tête plombée légère sur les structures rocheuses et herbiers.',
    affiliateLink: 'https://amazon.ca/s?k=Keitech+FAT+Swing+Impact+smallmouth+bass+fishing'
  },
  {
    id: 'apm07', name: 'Senko 4" Wacky Rig', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Wacky Rig',
    species: ['achigan'], price: 12,
    subSpecies: ['smallmouth'],
    description: 'Le stick worm classique en montage wacky. L\'un des achets les plus productifs pour l\'achigan.',
    technique: 'Jeter et laisser couler avec une action naturelle. Aucune récupération nécessaire.',
    affiliateLink: 'https://amazon.ca/s?k=Senko+wacky+rig+smallmouth+bass+fishing'
  },
  {
    id: 'apm08', name: 'Savage Gear Ned Craw', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Ned Rig',
    species: ['achigan'], price: 11,
    subSpecies: ['smallmouth'],
    description: 'Craw profile pour ned rig. Imite les écrevisses sur fond rocailleux parfaitement.',
    technique: 'Traîner lentement sur les rochers en eau claire. Excellent du printemps à l\'automne.',
    affiliateLink: 'https://amazon.ca/s?k=Savage+Gear+Ned+Craw+smallmouth+bass+fishing'
  },
  {
    id: 'apm09', name: 'Walking Topwater Stickbait', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['achigan'], price: 16,
    subSpecies: ['smallmouth'],
    description: 'Stickbait topwater pour achigans sur roche peu profonde. Attaques explosives garanties.',
    technique: 'Walk-the-dog sur les hauts-fonds rocheux et les courants matinaux.',
    affiliateLink: 'https://amazon.ca/s?k=walking+topwater+stickbait+smallmouth+bass+fishing'
  },
  {
    id: 'apm10', name: 'Popper (Smallmouth Bass)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['achigan'], price: 14,
    subSpecies: ['smallmouth'],
    description: 'Popper topwater pour achigan à petite bouche. Excellent en période de faible luminosité.',
    technique: 'Pop-pause-pop sur les flats rocheux et les sorties de courant.',
    affiliateLink: 'https://amazon.ca/s?k=popper+topwater+smallmouth+bass+fishing'
  },
  {
    id: 'apm11', name: 'Small Crankbait (Smallmouth)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['achigan'], price: 14,
    subSpecies: ['smallmouth'],
    description: 'Petit crankbait pour achigans en transition roche/sable et structures peu profondes.',
    technique: 'Lancer sur les pointes et couloir de roche. Déflexion contre les obstacles.',
    affiliateLink: 'https://amazon.ca/s?k=small+crankbait+smallmouth+bass+rock+fishing'
  },
  {
    id: 'apm12', name: 'DUO Realis Spinbait 80 (Spybait)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spybait',
    species: ['achigan'], price: 22,
    subSpecies: ['smallmouth'],
    description: 'Spybait pour eau claire et achigans méfiants. Technique unique avec palettes rotatives.',
    technique: 'Récupération lente et régulière en eau calme et claire. Mortal en été.',
    affiliateLink: 'https://amazon.ca/s?k=DUO+Realis+Spinbait+80+spybait+smallmouth+fishing'
  },
  {
    id: 'apm13', name: 'Propbait Smallmouth', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['achigan'], price: 16,
    subSpecies: ['smallmouth'],
    description: 'Prop bait subtil pour achigans dans les courants et zones rocheuses.',
    technique: 'Twitch-pause en eau calme le matin et le soir sur les hauts-fonds.',
    affiliateLink: 'https://amazon.ca/s?k=propbait+topwater+smallmouth+bass+fishing'
  },
  {
    id: 'apm14', name: 'Outkast Feider Fly Hair Jig', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Hair Jig',
    species: ['achigan'], price: 12,
    subSpecies: ['smallmouth'],
    description: 'Hair jig finesse pour achigans en eaux froides et sous pression. Irrésistible en finesse.',
    technique: 'Nage lente et naturelle au fond. Excellent en eaux froides d\'automne et printemps.',
    affiliateLink: 'https://amazon.ca/s?k=Outkast+Feider+Fly+hair+jig+smallmouth+bass+fishing'
  },
  {
    id: 'apm15', name: 'Shad Leadhead Swimbait (Smallmouth)', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['achigan'], price: 10,
    subSpecies: ['smallmouth'],
    description: 'Swimbait shad sur tête plombée pour les achigans profonds. Imitation parfaite.',
    technique: 'Swim lent sur les transitions profondes et au-dessus des hauts-fonds submergés.',
    affiliateLink: 'https://amazon.ca/s?k=shad+leadhead+swimbait+smallmouth+bass+fishing'
  },
  {
    id: 'apm16', name: 'Finesse Jig & Craw (Smallmouth)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig Finesse',
    species: ['achigan'], price: 11,
    subSpecies: ['smallmouth'],
    description: 'Jig finesse avec trailer craw pour achigan sur fond rocheux. Technique de fond efficace.',
    technique: 'Traîner et hopper lentement sur les rochers et structures dures.',
    affiliateLink: 'https://amazon.ca/s?k=finesse+jig+craw+smallmouth+bass+rock+fishing'
  },

  // ══════════════════════════════════════════════════
  // ACHIGAN À GRANDE BOUCHE — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'agm01', name: 'Hollow Body Frog (Largemouth)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater Frog',
    species: ['achigan'], price: 16,
    subSpecies: ['largemouth'],
    description: 'Grenouille corps creux pour les herbiers denses et mats de végétation. Explosif.',
    technique: 'Glissade sur les mats de nénuphars et herbiers. Walk-the-dog lent et régulier.',
    affiliateLink: 'https://amazon.ca/s?k=hollow+body+frog+largemouth+bass+topwater+fishing'
  },
  {
    id: 'agm02', name: 'Booyah Pad Crasher Frog', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater Frog',
    species: ['achigan'], price: 14,
    subSpecies: ['largemouth'],
    description: 'Grenouille de référence pour la pêche dans les nénuphars et mats de végétation.',
    technique: 'Poser sur les pads, walk-the-dog avec pauses dans les trous de végétation.',
    affiliateLink: 'https://amazon.ca/s?k=Booyah+Pad+Crasher+frog+largemouth+bass+fishing'
  },
  {
    id: 'agm03', name: 'Z-Man ChatterBait (Largemouth)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Chatterbait',
    species: ['achigan'], price: 16,
    subSpecies: ['largemouth'],
    description: 'Vibrating jig pour les bordures d\'herbiers. Attaque les achigans agressifs à grande bouche.',
    technique: 'Récupération régulière le long des herbiers. Varier la vitesse pour déclencher les strikes.',
    affiliateLink: 'https://amazon.ca/s?k=Z-Man+ChatterBait+largemouth+bass+fishing'
  },
  {
    id: 'agm04', name: 'Weedless Spinnerbait (Largemouth)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['achigan'], price: 12,
    subSpecies: ['largemouth'],
    description: 'Spinnerbait pour les achigans cachés dans les herbiers et bois mort.',
    technique: 'Slow-roll dans les herbiers ou récupération rapide sur les bords de structure.',
    affiliateLink: 'https://amazon.ca/s?k=weedless+spinnerbait+largemouth+bass+fishing'
  },
  {
    id: 'agm05', name: 'Senko 5" Texas Rig', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Texas Rig',
    species: ['achigan'], price: 12,
    subSpecies: ['largemouth'],
    description: 'Stick worm en montage Texas pour les herbiers denses et bois mort. Incontournable.',
    technique: 'Lancer dans la couverture, laisser couler, secousses légères et longues pauses.',
    affiliateLink: 'https://amazon.ca/s?k=Senko+5+Texas+Rig+largemouth+bass+fishing'
  },
  {
    id: 'agm06', name: 'Texas Rig Creature Bait', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Texas Rig',
    species: ['achigan'], price: 10,
    subSpecies: ['largemouth'],
    description: 'Creature bait pour pénétrer les couvertures épaisses. Pour les gros achigans cachés.',
    technique: 'Pénétrer la couverture dense avec une tête plombée lourde. Secouer sur place.',
    affiliateLink: 'https://amazon.ca/s?k=creature+bait+Texas+Rig+largemouth+bass+fishing'
  },
  {
    id: 'agm07', name: 'Punch Rig (Heavy Cover)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Punch Rig',
    species: ['achigan'], price: 14,
    subSpecies: ['largemouth'],
    description: 'Technique de pénétration pour les mats de végétation les plus denses. Leurre lourd.',
    technique: 'Laisser tomber verticalement à travers les mats. Shake et remontée rapide.',
    affiliateLink: 'https://amazon.ca/s?k=punch+rig+heavy+cover+largemouth+bass+fishing'
  },
  {
    id: 'agm08', name: 'Strike King KVD 1.5 Squarebill', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['achigan'], price: 18,
    subSpecies: ['largemouth'],
    description: 'Crankbait à bec carré qui rebondit sur les obstacles. Idéal pour les arbres tombés.',
    technique: 'Lancer contre les arbres tombés, docks et roches. La déflexion provoque les strikes.',
    affiliateLink: 'https://amazon.ca/s?k=Strike+King+KVD+1.5+Squarebill+largemouth+bass+fishing'
  },
  {
    id: 'agm09', name: 'Lipless Crankbait (Largemouth)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Lipless Crank',
    species: ['achigan'], price: 14,
    subSpecies: ['largemouth'],
    description: 'Crankbait sans bec pour arracher les herbiers au printemps. Vibrations intenses.',
    technique: 'Ripping dans les herbiers épars au printemps. Laisser tomber et reprendre.',
    affiliateLink: 'https://amazon.ca/s?k=lipless+crankbait+largemouth+bass+fishing'
  },
  {
    id: 'agm10', name: 'Swim Jig & Paddletail (Largemouth)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Swim Jig',
    species: ['achigan'], price: 12,
    subSpecies: ['largemouth'],
    description: 'Swim jig avec trailer paddletail pour les bordures de végétation. Très attractif.',
    technique: 'Swim lent le long des herbiers et bois mort. Changer de vitesse régulièrement.',
    affiliateLink: 'https://amazon.ca/s?k=swim+jig+paddletail+largemouth+bass+fishing'
  },
  {
    id: 'agm11', name: 'Johnson Silver Minnow (Largemouth)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['achigan'], price: 12,
    subSpecies: ['largemouth'],
    description: 'Cuillère weedless classique pour les nénuphars et slop. Un must have.',
    technique: 'Glissade sur les pads et végétation dense. Ajouter un trailer en chenille.',
    affiliateLink: 'https://amazon.ca/s?k=Johnson+Silver+Minnow+largemouth+bass+fishing'
  },
  {
    id: 'agm12', name: 'Buzzbait (Largemouth)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater',
    species: ['achigan'], price: 10,
    subSpecies: ['largemouth'],
    description: 'Buzzbait pour couvrir les zones d\'herbiers rapidement en surface.',
    technique: 'Récupération rapide pour maintenir la lame en surface. Meilleur tôt le matin.',
    affiliateLink: 'https://amazon.ca/s?k=buzzbait+largemouth+bass+topwater+fishing'
  },
  {
    id: 'agm13', name: 'Heavy Cover Jig 1/2oz (Largemouth)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['achigan'], price: 11,
    subSpecies: ['largemouth'],
    description: 'Jig lourd pour les couvertures denses et les docks. Pour les gros spécimens.',
    technique: 'Pitch dans les trous de couverture. Secouer et remonter lentement.',
    affiliateLink: 'https://amazon.ca/s?k=heavy+cover+jig+1+2+oz+largemouth+bass+fishing'
  },
  {
    id: 'agm14', name: 'Weightless Fluke Soft Jerkbait', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Softbait',
    species: ['achigan'], price: 9,
    subSpecies: ['largemouth'],
    description: 'Shad souple sans plomb pour les couloirs ouverts dans la végétation.',
    technique: 'Traction-pause dans les allées ouvertes. Excellente imitation de poisson blessé.',
    affiliateLink: 'https://amazon.ca/s?k=weightless+fluke+soft+jerkbait+largemouth+bass+fishing'
  },
  {
    id: 'agm15', name: 'Popping Frog (Matted Grass)', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater Frog',
    species: ['achigan'], price: 14,
    subSpecies: ['largemouth'],
    description: 'Grenouille popper pour les mats de végétation et les zones semi-ouvertes.',
    technique: 'Pop courts et pauses longues sur les herbiers semi-ouverts en été.',
    affiliateLink: 'https://amazon.ca/s?k=popping+frog+matted+grass+largemouth+bass+fishing'
  },
  {
    id: 'agm16', name: 'Wacky Worm Around Docks', imageFile: 'softbait.jpg', type: 'softbait', typeFR: 'Wacky Rig',
    species: ['achigan'], price: 10,
    subSpecies: ['largemouth'],
    description: 'Technique wacky subtile pour les achigans sous les docks et ombre profonde.',
    technique: 'Skip sous les docks. Laisser couler et shaker légèrement. Touche souvent sur la chute.',
    affiliateLink: 'https://amazon.ca/s?k=wacky+worm+rig+dock+largemouth+bass+fishing'
  },

  // ══════════════════════════════════════════════════
  // OMBLE DE FONTAINE (BROOK TROUT) — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'ot01', name: 'Mepps Aglia #1 Bronze', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 10,
    subSpecies: ['brook'],
    description: 'Le spinner de référence pour l\'omble de fontaine au Québec. Efficace depuis des décennies.',
    technique: 'Lancer en travers du courant et récupérer avec la rivière. Vitesse modérée.',
    affiliateLink: 'https://amazon.ca/s?k=Mepps+Aglia+1+Bronze+brook+trout+fishing'
  },
  {
    id: 'ot02', name: 'Panther Martin Gold/Red Dot', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 9,
    subSpecies: ['brook'],
    description: 'Spinner à rotation immédiate avec flash intense. Excellent pour les ombles réactifs.',
    technique: 'Récupération amont pour provoquer l\'attaque dans les fosses et sorties de rapides.',
    affiliateLink: 'https://amazon.ca/s?k=Panther+Martin+gold+red+dot+brook+trout+fishing'
  },
  {
    id: 'ot03', name: 'Acme Little Cleo Gold', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 8,
    subSpecies: ['brook'],
    description: 'Petite cuillère papillon idéale pour ombles en lac. Flutter naturel et action de chute attrayante.',
    technique: 'Trolling lent en lac ou lancer-récupération erratique en rivière.',
    affiliateLink: 'https://amazon.ca/s?k=Acme+Little+Cleo+gold+brook+trout+fishing'
  },
  {
    id: 'ot04', name: 'Rapala Original Floater #5 (Brook)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 12,
    subSpecies: ['brook'],
    description: 'Minnow flottant classique pour ombles en lac et rivière. Action de wobble douce.',
    technique: 'Trolling lent ou lancer-traction en rivière. Suspending action naturelle.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Original+Floater+5+brook+trout+fishing'
  },
  {
    id: 'ot05', name: 'Blue Fox Vibrax #2 (Brook Trout)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 11,
    subSpecies: ['brook'],
    description: 'Spinner Blue Fox avec corps laiton amplifiant vibrations. Très efficace en courant.',
    technique: 'Lancer dans les sorties de rapides et fosses. Récupération modérée.',
    affiliateLink: 'https://amazon.ca/s?k=Blue+Fox+Vibrax+2+brook+trout+spinner+fishing'
  },
  {
    id: 'ot06', name: 'Woolly Bugger Olive #8', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 4,
    subSpecies: ['brook'],
    description: 'Mouche streamère universelle pour omble de fontaine. Imite vers, sangsues et petits poissons.',
    technique: 'Nymphe ou streamère : lancer en amont, dériver ou tirer lentement dans les fosses.',
    affiliateLink: 'https://amazon.ca/s?k=Woolly+Bugger+Olive+8+brook+trout+fly+fishing'
  },
  {
    id: 'ot07', name: 'Muddler Minnow #8 (Brook)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 4,
    subSpecies: ['brook'],
    description: 'Streamère classique imitant la loche et les petits poissons. Excellent pour les gros ombles.',
    technique: 'Tirer en surface ou mi-eau dans les fosses profondes. Variation de vitesse.',
    affiliateLink: 'https://amazon.ca/s?k=Muddler+Minnow+8+brook+trout+fly+fishing'
  },
  {
    id: 'ot08', name: 'Grey Ghost Streamer (Brook)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 5,
    subSpecies: ['brook'],
    description: 'Streamère emblématique pour omble de fontaine en lac québécois. Un classique.',
    technique: 'Trolling lent en lac ou tirer dans les fosses en rivière. Récupération uniforme.',
    affiliateLink: 'https://amazon.ca/s?k=Grey+Ghost+Streamer+brook+trout+fly+fishing'
  },
  {
    id: 'ot09', name: 'Orange Grey Ghost (Québec)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 5,
    subSpecies: ['brook'],
    description: 'Variante québécoise du Grey Ghost avec corps orange. Très populaire au Québec.',
    technique: 'Trolling en lac ou dérive dans les fosses de rivière. Récupération lente.',
    affiliateLink: 'https://amazon.ca/s?k=Orange+Grey+Ghost+streamer+brook+trout+Quebec+fishing'
  },
  {
    id: 'ot10', name: 'Royal Wulff Dry Fly #12', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Sèche',
    species: ['truite'], price: 4,
    subSpecies: ['brook'],
    description: 'Mouche sèche attractor classique pour ombles en saisisseurs de surface. Haute flottabilité.',
    technique: 'Dériver à la surface dans les plats et fosses. Excellent lors des éclosions.',
    affiliateLink: 'https://amazon.ca/s?k=Royal+Wulff+Dry+Fly+12+brook+trout+fly+fishing'
  },
  {
    id: 'ot11', name: 'Elk Hair Caddis #14 (Brook)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Sèche',
    species: ['truite'], price: 4,
    subSpecies: ['brook'],
    description: 'Imitation sedge (phrygane) indispensable pour les éclosions estivales d\'ombles.',
    technique: 'Dérive naturelle en surface pendant les éclosions de sedges. Très efficace le soir.',
    affiliateLink: 'https://amazon.ca/s?k=Elk+Hair+Caddis+14+brook+trout+fly+fishing'
  },
  {
    id: 'ot12', name: 'Pheasant Tail Nymph #14', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Nymphe',
    species: ['truite'], price: 3,
    subSpecies: ['brook'],
    description: 'Nymphe universelle pour ombles de fontaine. Imite les larves de mouches de mai.',
    technique: 'Dérive en fond ou mi-eau avec indicateur. Standard pour la nymphe en plongeon.',
    affiliateLink: 'https://amazon.ca/s?k=Pheasant+Tail+Nymph+14+brook+trout+fly+fishing'
  },
  {
    id: 'ot13', name: 'Adams Parachute #14 (Brook)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Sèche',
    species: ['truite'], price: 4,
    subSpecies: ['brook'],
    description: 'Mouche sèche universelle. Imite de nombreux éphémères en surface.',
    technique: 'Dérive sans drag sur toutes les eaux. La mouche sèche universelle par excellence.',
    affiliateLink: 'https://amazon.ca/s?k=Adams+Parachute+14+brook+trout+fly+fishing'
  },
  {
    id: 'ot14', name: 'La Bostonnais Streamer (Québec)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 5,
    subSpecies: ['brook'],
    description: 'Streamère québécois style bostonnais pour les ombles de fontaine. Profil local reconnu.',
    technique: 'Tirage lent en lac ou swing en rivière. Coloris spécifiques aux eaux québécoises.',
    affiliateLink: 'https://amazon.ca/s?k=La+Bostonnais+streamer+brook+trout+Quebec+fishing'
  },
  {
    id: 'ot15', name: 'Panther Martin Inline Spinner (Brook)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 9,
    subSpecies: ['brook'],
    description: 'Version inline du Panther Martin pour les ruisseaux et rivières à ombles.',
    technique: 'Lancer en amont et récupérer avec le courant. La lame tourne dès l\'impact.',
    affiliateLink: 'https://amazon.ca/s?k=Panther+Martin+Inline+Spinner+brook+trout+fishing'
  },
  {
    id: 'ot16', name: 'Mickey Finn Streamer (Brook)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 5,
    subSpecies: ['brook'],
    description: 'Streamère lumineux jaune-rouge pour provoquer les réactions des ombles.',
    technique: 'Tirer vite dans les fosses et sous les rapides. Excellent pour les ombles agressifs.',
    affiliateLink: 'https://amazon.ca/s?k=Mickey+Finn+Streamer+brook+trout+fly+fishing'
  },

  // ══════════════════════════════════════════════════
  // TOULADI (LAKE TROUT) — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'lt01', name: 'Williams Wabler / Wobbler', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 16,
    subSpecies: ['lake'],
    description: 'La cuillère iconique canadienne pour touladi. Action de flutter inégalée en profondeur.',
    technique: 'Trolling à 1.5-2.5 mph sur les récifs, points et bassins profonds.',
    affiliateLink: 'https://amazon.ca/s?k=Williams+Wabler+Wobbler+lake+trout+fishing'
  },
  {
    id: 'lt02', name: 'Len Thompson No.5 Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 14,
    subSpecies: ['lake'],
    description: 'Cuillère canadienne classique pour touladi. Jaune/rouge ou cinq de carreau.',
    technique: 'Trolling à vitesse modérée sur les structures et bassins profonds du Québec.',
    affiliateLink: 'https://amazon.ca/s?k=Len+Thompson+No.5+Spoon+lake+trout+fishing'
  },
  {
    id: 'lt03', name: 'Acme Little Cleo (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 9,
    subSpecies: ['lake'],
    description: 'Excellente pour les touladis en trolling et en jigging. Flutter attractif.',
    technique: 'Trolling lent ou jigging vertical au-dessus des marques sonar.',
    affiliateLink: 'https://amazon.ca/s?k=Acme+Little+Cleo+lake+trout+fishing'
  },
  {
    id: 'lt04', name: 'Swedish Pimple Jigging Spoon', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jigging Spoon',
    species: ['truite'], price: 10,
    subSpecies: ['lake'],
    description: 'Jigging spoon métallique compact pour les touladis profonds. Action unique.',
    technique: 'Jigging agressif au-dessus des marques sonar en 20-100 pieds.',
    affiliateLink: 'https://amazon.ca/s?k=Swedish+Pimple+jigging+spoon+lake+trout+fishing'
  },
  {
    id: 'lt05', name: 'Tube Jig 5" White (Lake Trout)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Tube Jig',
    species: ['truite'], price: 8,
    subSpecies: ['lake'],
    description: 'Tube jig blanc classique pour touladi. Le leurre de jigging vertical par excellence.',
    technique: 'Jigging vertical court directement au fond. La couleur blanche est universelle.',
    affiliateLink: 'https://amazon.ca/s?k=Tube+Jig+5+White+lake+trout+fishing'
  },
  {
    id: 'lt06', name: 'Pearl/Glow Tube Jig (Lake Trout)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Tube Jig',
    species: ['truite'], price: 9,
    subSpecies: ['lake'],
    description: 'Tube jig lumineux pour les grandes profondeurs et faible luminosité. Très efficace.',
    technique: 'Charger la lueur avant descente. Jigging lent en profondeur 40-100+ pieds.',
    affiliateLink: 'https://amazon.ca/s?k=pearl+glow+tube+jig+lake+trout+fishing'
  },
  {
    id: 'lt07', name: 'Kastmaster 1oz (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 12,
    subSpecies: ['lake'],
    description: 'Cuillère compacte et lourde pour descendre rapidement et jigging profond.',
    technique: 'Jigging vertical ou lancer-compter pour atteindre les profondeurs rapidement.',
    affiliateLink: 'https://amazon.ca/s?k=Kastmaster+1oz+lake+trout+fishing'
  },
  {
    id: 'lt08', name: 'Mooselook Wobbler (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 13,
    subSpecies: ['lake'],
    description: 'Cuillère classique pour touladi avec wobble distinct. Couleurs naturelles préférées.',
    technique: 'Trolling à 1.5-2 mph sur les récifs et bassins profonds nordiques.',
    affiliateLink: 'https://amazon.ca/s?k=Mooselook+Wobbler+lake+trout+fishing'
  },
  {
    id: 'lt09', name: 'Hopkins Jigging Spoon (Lake Trout)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jigging Spoon',
    species: ['truite'], price: 11,
    subSpecies: ['lake'],
    description: 'Jigging spoon compact pour les touladis en profondeur. Flash intense.',
    technique: 'Jigging agressif avec levées rapides et chutes contrôlées.',
    affiliateLink: 'https://amazon.ca/s?k=Hopkins+Jigging+Spoon+lake+trout+fishing'
  },
  {
    id: 'lt10', name: 'Eppinger Huskie Devle (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 16,
    subSpecies: ['lake'],
    description: 'Grand Dardevle pour les gros touladis. Thump puissant visible de loin.',
    technique: 'Trolling lent ou jigging vertical pour les gros spécimens.',
    affiliateLink: 'https://amazon.ca/s?k=Eppinger+Huskie+Devle+lake+trout+fishing'
  },
  {
    id: 'lt11', name: 'Heavy Paddletail Swimbait (Lake Trout)', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait',
    species: ['truite'], price: 14,
    subSpecies: ['lake'],
    description: 'Grand swimbait paddletail pour touladis suspendus et profonds.',
    technique: 'Slow-roll sur les thermoclines et structures profondes. 20-60 pieds.',
    affiliateLink: 'https://amazon.ca/s?k=heavy+paddletail+swimbait+lake+trout+fishing'
  },
  {
    id: 'lt12', name: 'FlatFish Trolling Lure (Lake Trout)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 14,
    subSpecies: ['lake'],
    description: 'Leurre de trolling unique avec action de wobble prononcé. Classique pour les touladis.',
    technique: 'Trolling lent à 1.5 mph sur les thermoclines et structures connues.',
    affiliateLink: 'https://amazon.ca/s?k=FlatFish+trolling+lure+lake+trout+fishing'
  },
  {
    id: 'lt13', name: 'Sutton Spoon (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 15,
    subSpecies: ['lake'],
    description: 'Flutter spoon québécois-canadien pour les touladis en eaux froides profondes.',
    technique: 'Trolling profond avec downrigger ou trolling léger en surface tôt printemps.',
    affiliateLink: 'https://amazon.ca/s?k=Sutton+Spoon+lake+trout+fishing'
  },
  {
    id: 'lt14', name: 'Large Rapala Trolling Minnow (Lake Trout)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 20,
    subSpecies: ['lake'],
    description: 'Grand minnow Rapala pour imiter le cisco et la barbotte en profondeur.',
    technique: 'Trolling à 1.5-2 mph sur les structures et bassins profonds avec snap weights.',
    affiliateLink: 'https://amazon.ca/s?k=large+Rapala+trolling+minnow+lake+trout+fishing'
  },
  {
    id: 'lt15', name: 'Bucktail Jig (Lake Trout)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig',
    species: ['truite'], price: 9,
    subSpecies: ['lake'],
    description: 'Jig bucktail vertical pour touladis en profondeur. Action naturelle impressionnante.',
    technique: 'Jigging vertical lent avec pauses sur les marques sonar. Blanc ou chartreuse.',
    affiliateLink: 'https://amazon.ca/s?k=bucktail+jig+lake+trout+fishing'
  },
  {
    id: 'lt16', name: 'Pixee Spoon (Lake Trout)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 12,
    subSpecies: ['lake'],
    description: 'Cuillère compacte à flutter pour touladis. Tombée naturelle très attractive.',
    technique: 'Jigging vertical ou trolling léger. Excellent pour la pêche printanière.',
    affiliateLink: 'https://amazon.ca/s?k=Pixee+Spoon+lake+trout+fishing'
  },

  // ══════════════════════════════════════════════════
  // TRUITE ARC-EN-CIEL (RAINBOW TROUT) — 16 items
  // ══════════════════════════════════════════════════
  {
    id: 'rt01', name: 'Mepps Aglia #3 Rainbow', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 10,
    subSpecies: ['rainbow'],
    description: 'Le spinner de référence pour la truite arc-en-ciel. Tourne à basse vitesse.',
    technique: 'Lancer en travers et récupérer avec le courant ou trolling lent en lac.',
    affiliateLink: 'https://amazon.ca/s?k=Mepps+Aglia+3+rainbow+trout+fishing'
  },
  {
    id: 'rt02', name: 'Panther Martin #6 Yellow (Rainbow)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 10,
    subSpecies: ['rainbow'],
    description: 'Spinner Panther Martin à rotation immédiate. Excellent pour les arc-en-ciel actifs.',
    technique: 'Récupération modérée dans les courants et fosses. Excellent pour truites ensemencées.',
    affiliateLink: 'https://amazon.ca/s?k=Panther+Martin+6+Yellow+rainbow+trout+fishing'
  },
  {
    id: 'rt03', name: 'Worden\'s Rooster Tail (Rainbow)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 9,
    subSpecies: ['rainbow'],
    description: 'Spinner classique avec jupe en plume. Grand producteur de truites arc-en-ciel.',
    technique: 'Récupération lente à modérée dans les rivières et ruisseaux. Très polyvalent.',
    affiliateLink: 'https://amazon.ca/s?k=Worden+Rooster+Tail+rainbow+trout+fishing'
  },
  {
    id: 'rt04', name: 'Blue Fox Vibrax #3 (Rainbow)', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner',
    species: ['truite'], price: 11,
    subSpecies: ['rainbow'],
    description: 'Flash et vibrations intenses pour les truites en courant rapide.',
    technique: 'Lancer en travers du courant, récupération soutenue dans les rapides.',
    affiliateLink: 'https://amazon.ca/s?k=Blue+Fox+Vibrax+3+rainbow+trout+fishing'
  },
  {
    id: 'rt05', name: 'Acme Phoebe Spoon (Rainbow)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 8,
    subSpecies: ['rainbow'],
    description: 'Petite cuillère compacte pour les truites arc-en-ciel en rivière et ruisseau.',
    technique: 'Lancer en amont, laisser couler et récupérer irrégulièrement.',
    affiliateLink: 'https://amazon.ca/s?k=Acme+Phoebe+Spoon+rainbow+trout+fishing'
  },
  {
    id: 'rt06', name: 'Rapala Countdown CD5 (Rainbow)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 12,
    subSpecies: ['rainbow'],
    description: 'Minnow qui coule à vitesse contrôlée. Atteint les truites à profondeur précise.',
    technique: 'Compter jusqu\'à la profondeur désirée puis récupérer lentement.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Countdown+CD5+rainbow+trout+fishing'
  },
  {
    id: 'rt07', name: 'Rapala Husky Jerk HJ8 (Rainbow)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 16,
    subSpecies: ['rainbow'],
    description: 'Minnow suspending pour truites arc-en-ciel en lac et réservoirs profonds.',
    technique: 'Traction-pause dans les zones de transition. Excellent au début du printemps.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Husky+Jerk+HJ8+rainbow+trout+fishing'
  },
  {
    id: 'rt08', name: 'Rapala Original Floater #7 (Rainbow)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 13,
    subSpecies: ['rainbow'],
    description: 'Le Rapala classique pour truites en surface. Action naturelle sans égal.',
    technique: 'Trolling très lent ou dérive dans les fosses. Imitation baitfish parfaite.',
    affiliateLink: 'https://amazon.ca/s?k=Rapala+Original+Floater+7+rainbow+trout+fishing'
  },
  {
    id: 'rt09', name: 'Woolly Bugger Black #6 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Streamère',
    species: ['truite'], price: 4,
    subSpecies: ['rainbow'],
    description: 'Mouche streamère universelle pour truites arc-en-ciel. Imite vers et petits poissons.',
    technique: 'Strip rapide ou dérive selon conditions. Excellent en eau froide.',
    affiliateLink: 'https://amazon.ca/s?k=Woolly+Bugger+Black+6+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt10', name: 'Parachute Adams #14 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Sèche',
    species: ['truite'], price: 4,
    subSpecies: ['rainbow'],
    description: 'Mouche sèche universelle pour truites en surface lors des éclosions.',
    technique: 'Dérive sans drag dans les plats et fosses pendant les éclosions d\'éphémères.',
    affiliateLink: 'https://amazon.ca/s?k=Parachute+Adams+14+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt11', name: 'Pheasant Tail Nymph #12 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Nymphe',
    species: ['truite'], price: 3,
    subSpecies: ['rainbow'],
    description: 'Nymphe incontournable pour truites arc-en-ciel. Imite les larves d\'éphémères.',
    technique: 'Dérive en profondeur avec indicateur. La technique universelle pour truite.',
    affiliateLink: 'https://amazon.ca/s?k=Pheasant+Tail+Nymph+12+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt12', name: 'Hare\'s Ear Nymph #10 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Nymphe',
    species: ['truite'], price: 4,
    subSpecies: ['rainbow'],
    description: 'Nymphe fourragère imitant de nombreux insectes. Universellement efficace.',
    technique: 'Dérive profonde ou nymphe en plongeon. Polyvalente dans toutes les eaux.',
    affiliateLink: 'https://amazon.ca/s?k=Hare+Ear+Nymph+10+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt13', name: 'X-Caddis Emerger #14 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Émergente',
    species: ['truite'], price: 4,
    subSpecies: ['rainbow'],
    description: 'Imitation de caddis émergente pour les truites à la surface lors des éclosions.',
    technique: 'Dans le film d\'eau lors des émergences de sedges. Très efficace le soir.',
    affiliateLink: 'https://amazon.ca/s?k=X-Caddis+Emerger+14+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt14', name: 'Stimulator Dry Fly #12 (Rainbow)', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Mouche Sèche',
    species: ['truite'], price: 4,
    subSpecies: ['rainbow'],
    description: 'Mouche sèche attractor haute flottabilité. Imite les grosses éphémères et caddis.',
    technique: 'Dérive rapide dans les rapides et courants vifs. Très visible en surface agitée.',
    affiliateLink: 'https://amazon.ca/s?k=Stimulator+Dry+Fly+12+rainbow+trout+fly+fishing'
  },
  {
    id: 'rt15', name: 'Small Silver Spoon (Rainbow)', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère',
    species: ['truite'], price: 8,
    subSpecies: ['rainbow'],
    description: 'Petite cuillère argentée pour les truites ensemencées et sauvages. Simple et efficace.',
    technique: 'Lancer et récupération irrégulière. Bonne couleur en eau claire.',
    affiliateLink: 'https://amazon.ca/s?k=small+silver+spoon+rainbow+trout+fishing'
  },
  {
    id: 'rt16', name: 'Micro Crankbait Minnow (Rainbow)', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait',
    species: ['truite'], price: 11,
    subSpecies: ['rainbow'],
    description: 'Micro crankbait pour truites arc-en-ciel en étangs et rivières ensemencées.',
    technique: 'Trolling très lent ou récupération lente en rivière. Excellente action naturelle.',
    affiliateLink: 'https://amazon.ca/s?k=micro+crankbait+minnow+rainbow+trout+fishing'
  },

]
