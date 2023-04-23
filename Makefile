install_native:
	@mkdir -p /usr/local/bin
	@cp ./native/obsidianbookmarks.py /usr/local/bin
	@chmod +x /usr/local/bin/obsidianbookmarks.py
	@cp ./native/obsidianbookmarks.py ~/Library/Application\ Support/Mozilla/NativeMessagingHosts
	@echo "Done!"

