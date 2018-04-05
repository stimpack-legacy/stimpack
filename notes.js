renderAvailablePacks() {
    // The data variable is injected into welcome.blade.php
            
    return data.packs.map((pack) => {
        return (<option key={pack.name}>{pack.name}</option>);
    })        
}

selectPack() {
    document.getElementById('packBar').style.display = "block";
}