document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const albumImage = document.getElementById("albumImage");
  const playlist = document.querySelector(".playlist");
  const backButton = document.getElementById("backButton");
  const stopButton = document.getElementById("stopButton"); // Added stopButton

  const defaultSong = "./assets/song5.mp3";
  const defaultImage = "assets/music-symbol.png";
  const initialListItem = document.querySelector(".playlist li");
  audioPlayer.src = defaultSong;
  albumImage.src = defaultImage;

  initialListItem.addEventListener("click", expandPlaylist);

  function expandPlaylist() {
    const expandedSongs = [
      { name: "Aradhya", src: "./assets/Aradhya.mp3", img: "assets/aradhya.jpg" },
      { name: "Naa Roja Nuvve", src: "./assets/Na_Roja_Nuvve.mp3", img: "assets/narojanuvve.jpg" },
      { name: "Kushi Title", src: "./assets/song5.mp3", img: "assets/kushititle.jpeg" },
      { name: "Yedhaki Oka Gaayam", src: "./assets/Yedhaki _Oka_Gaayam.mp3", img: "assets/yedhakiokagaayam.jpeg" },
    ];
    playlist.innerHTML = "";
    expandedSongs.forEach((song) => {
      const listItem = createPlaylistItem(song);
      playlist.appendChild(listItem);
    });

    backButton.style.display = "block";
    initialListItem.removeEventListener("click", expandPlaylist);
    backButton.addEventListener("click", collapsePlaylist);
  }

  function expandBroAlbum() {
    const broSongs = [
      { name: "Bro-slokam", src: "./assets/song6.mp3", img: "assets/bro1.jpg" },
      { name: "Bro Song 2", src: "./assets/song7.mp3", img: "assets/bro3.jpg" },
      { name: "Bro rap", src: "./assets/song8.mp3", img: "assets/bro1.jpg" },
    ];

    playlist.innerHTML = "";
    broSongs.forEach((song) => {
      const listItem = createPlaylistItem(song);
      playlist.appendChild(listItem);
    });

    backButton.style.display = "block";
    broAlbum.removeEventListener("click", expandBroAlbum);
    backButton.addEventListener("click", collapsePlaylist);
  }

  const broAlbum = document.getElementById("broAlbum");
  broAlbum.addEventListener("click", expandBroAlbum);

  function createPlaylistItem(song) {
    const listItem = document.createElement("li");
    listItem.textContent = song.name;
    listItem.setAttribute("data-src", song.src);
    listItem.addEventListener("click", () => {
      audioPlayer.src = song.src;
      albumImage.src = song.img || defaultImage;
    });

    listItem.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const isConfirmed = confirm('Song paused. Do you want to store the song ID?');

      if (isConfirmed) {
        const songID = listItem.getAttribute('data-src');
        fetch('/api/storeSongID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songID }),
        })
          .then(response => response.json())
          .then(data => {
            alert(`ObjectID: ${data.objectID}`);
          })
          .catch(error => console.error('Error:', error));
      }
    });

    return listItem;
  }

  // Event listener for the stopButton
  stopButton.addEventListener('click', () => {
    audioPlayer.pause();
    // Handle stopping the song, and storing the song ID if needed
    const isConfirmed = confirm('Song paused. Do you want to store the song ID?');

    if (isConfirmed) {
      const songID = audioPlayer.src; // Assuming the song ID is the source URL
      fetch('/api/storeSongID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songID }),
      })
        .then(response => response.json())
        .then(data => {
          alert(`ObjectID: ${data.objectID}`);
        })
        .catch(error => console.error('Error:', error));
    }
  });

  function collapsePlaylist() {
    playlist.innerHTML = "";
    const initialListItemClone = createPlaylistItem({ name: "Kushi", src: "./assets/song5.mp3" });
    playlist.appendChild(initialListItemClone);
    backButton.style.display = "none";
    initialListItemClone.addEventListener("click", expandPlaylist);
    backButton.removeEventListener("click", collapsePlaylist);
    albumImage.src = defaultImage;
  }
});
