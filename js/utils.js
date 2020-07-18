function mergePaths(folder, filename) {
    if (folder.length == 0) return filename;
    return folder + "/" + filename;
}