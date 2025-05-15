// script.js

const bundles = [
    {
      title: "Commando Veteran",
      image: "https://media.discordapp.net/attachments/1369826084098543656/1372600498015830056/b66e3ca8-d4ce-423e-8b22-c5a3e37a7953.png?ex=68275d54&is=68260bd4&hm=ebba3e5c6d984c2ee99109ea6d9450b4854c8df8a34d4e00e9a190088ef1f775&=&format=webp&quality=lossless",
      items: [
        { name: "Metal Facemask", rc: 300, image: "Items/Commando Veteran/Metal Facemask.png" },
        { name: "Metal Chestplate", rc: 400, image: "Items/Commando Veteran/Metal Chestplate.png" },
        { name: "Hoodie", rc: 300, image: "Items/Commando Veteran/Hoodie.png" },
        { name: "Pants", rc: 200, image: "Items/Commando Veteran/Pants.png" },
        { name: "Roadsign Gloves", rc: 250, image: "Items/Commando Veteran/Roadsign Gloves.png" },
        { name: "Road Sign Kilt", rc: 150, image: "Items/Commando Veteran/Road Sign Kilt.png" },
      ],
    },
    {
      title: "Necronomic Architecture",
      image: "https://media.discordapp.net/attachments/1369826084098543656/1372602770527358997/image0.jpg?ex=68275f72&is=68260df2&hm=afaa4c5eee098d16e6e4328035dcd71a4e7aceac240234e737691335ef32811f&=&format=webp",
      items: [
        { name: "Helmet", rc: 400, image: "https://i.imgur.com/1Bq4nHg.png" },
        { name: "Chestplate", rc: 500, image: "https://i.imgur.com/dQNSEXF.png" },
        { name: "Pants", rc: 400, image: "https://i.imgur.com/gqc2oLZ.png" },
        { name: "Boots", rc: 200, image: "https://i.imgur.com/bGZ8Yvz.png" },
        { name: "Rifle Skin", rc: 200, image: "https://i.imgur.com/fCe53aD.png" },
        { name: "Gloves", rc: 100, image: "https://i.imgur.com/I4Lx4v3.png" },
      ],
    },
    {
      title: "Wizard Veteran",
      image: "https://media.discordapp.net/attachments/1369826084098543656/1372603675817672724/image0.jpg?ex=6827604a&is=68260eca&hm=5029c2d82fde5f0de0526c32aa00371c959ba0651f5bcd0e8a0856e93b232f4b&=&format=webp",
      items: [
        { name: "Helmet", rc: 250, image: "https://i.imgur.com/L7DH9O2.png" },
        { name: "Armor", rc: 450, image: "https://i.imgur.com/B9aCZr5.png" },
        { name: "Leggings", rc: 350, image: "https://i.imgur.com/sNOQTJI.png" },
        { name: "Boots", rc: 200, image: "https://i.imgur.com/uX7hjdQ.png" },
        { name: "Sniper Skin", rc: 200, image: "https://i.imgur.com/nKF8buK.png" },
        { name: "Cloak", rc: 50, image: "https://i.imgur.com/DGfKJBK.png" },
      ],
    },
    {
      title: "Film Noir",
      image: "https://media.discordapp.net/attachments/1369826084098543656/1372603948443242678/image0.jpg?ex=6827608b&is=68260f0b&hm=59e72531cecde196f2258b40f3618f2e37012a96c16820db2cfbafc7ec436b36&=&format=webp",
      items: [
        { name: "Helmet", rc: 300, image: "https://i.imgur.com/RDYXwbF.png" },
        { name: "Chestpiece", rc: 450, image: "https://i.imgur.com/Pq56BcY.png" },
        { name: "Leggings", rc: 350, image: "https://i.imgur.com/hCK8wvJ.png" },
        { name: "Boots", rc: 200, image: "https://i.imgur.com/oM4JkBn.png" },
        { name: "SMG Skin", rc: 250, image: "https://i.imgur.com/zUVvZgi.png" },
        { name: "Night Vision", rc: 150, image: "https://i.imgur.com/2GjMnG2.png" },
      ],
    },
  ];
  
  const container = document.getElementById("bundle-container");
  const details = document.getElementById("bundle-details");
  const title = document.getElementById("bundle-title");
  const itemsGrid = document.getElementById("items-grid");

  // We don't need the itemImages object anymore as each item has its own image
  
  bundles.forEach((bundle, index) => {
    const div = document.createElement("div");
    div.className = "bundle";
    div.innerHTML = `
      <img src="${bundle.image}" alt="${bundle.title}" />
    `;
    div.onclick = () => showDetails(index);
    container.appendChild(div);
  });
  
  function showDetails(index) {
    const bundle = bundles[index];
    title.textContent = bundle.title;
    itemsGrid.innerHTML = "";
    
    // Add no-scroll class to body
    document.body.classList.add('no-scroll');
    
    bundle.items.forEach(item => {
      // Create item card
      const itemCard = document.createElement("div");
      itemCard.className = "item-card";
      
      // Create item image
      const img = document.createElement("img");
      // Use the image directly from the item object
      img.src = item.image;
      img.alt = item.name;
      img.width = 181;
      img.height = 172;
      
      // Create item name element
      const nameElem = document.createElement("div");
      nameElem.className = "item-name";
      nameElem.textContent = item.name;
      
      // Append elements to item card
      itemCard.appendChild(img);
      itemCard.appendChild(nameElem);
      
      // Add item card to grid
      itemsGrid.appendChild(itemCard);
    });
    
    details.classList.remove("hidden");
  }
  
  function closeDetails() {
    details.classList.add("hidden");
    // Remove no-scroll class from body
    document.body.classList.remove('no-scroll');
  }

  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
  document.body.classList.remove('no-scroll');
  document.documentElement.classList.remove('no-scroll');
