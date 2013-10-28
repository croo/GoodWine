:command Tidy :%!tidy -q -i --show-errors 0 -w 128 --doctype user

map <F12> :Tidy <CR>

nnoremap <C-J> mzo<Esc>`z
nnoremap <C-K> mzO<Esc>`z

map <F5> :NERDTreeToggle <CR>
